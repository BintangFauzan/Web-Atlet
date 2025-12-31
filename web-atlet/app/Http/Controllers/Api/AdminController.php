<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cabor;
use App\Models\Team;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Provides a dashboard view for the logged-in admin.
     * Returns the admin's cabor and the teams within that cabor.
     */
    // public function dashboard()
    // {
    //     $admin = Auth::user();

    //     if (!$admin) {
    //         return response()->json(['message' => 'Unauthenticated.'], 401);
    //     }

    //     if (!$admin->cabor_id) {
    //         return response()->json([
    //             'message' => 'Admin account is not associated with a Cabor.',
    //             'admin' => [
    //                 'id' => $admin->id,
    //                 'name' => $admin->name,
    //                 'email' => $admin->email,
    //             ]
    //         ], 404);
    //     }

    //     // Eager load the cabor relationship to get cabor details
    //     $admin->load('cabor');

    //     // Fetch teams belonging to the admin's cabor
    //     $teams = Team::where('cabor_id', $admin->cabor_id)
    //                  ->with('manager:id,name') // Eager load manager details
    //                  ->get();
    //     $member = Team::where('id', $admin->team_id)->get();

    //     return response()->json([
    //         'status' => true,
    //         'admin' => [
    //             'id' => $admin->id,
    //             'name' => $admin->name,
    //         ],
    //         'cabor' => $admin->cabor, // This will be the Cabor model instance
    //         'teams' => $teams,
    //         'member' => $member
    //     ]);

    //      if (!$admin->cabor_id) {
    //         return response()->json([
    //             'message' => 'Admin account is not associated with a Cabor.',
    //             'admin' => [
    //                 'id' => $admin->id,
    //                 'name' => $admin->name,
    //                 'email' => $admin->email,
    //             ]
    //         ], 404);
    //     }

    // }


    /**
     * Display a listing of the teams for the admin's cabor.
     */
    public function index()
    {
        $admin = Auth::user();
        $admin->load('cabor');
        //   $team = Team::with( 'coach')->latest()->get();
        $tim = Team::with(['coach', 'athletes'])->withCount('athletes')->latest()->get();
        $formatedTim = $tim->map(function ($tim) {
            return [
                'id' => $tim->id,
                'nama_tim' => $tim->name,
                'pelatih' => $tim->coach ? [
                    'id' => $tim->coach->id,
                    'nama' => $tim->coach->name,
                ] : 'Belum ada pelatih',
                'jumlah_atlet' => $tim->athletes_count,
                'daftar_atlet' => $tim->athletes->map(function ($athlete) {
                    return [
                        'id' => $athlete->id,
                        'name' => $athlete->name,
                        'email' => $athlete->email
                    ];
                }),
            ];
        });

        return response()->json([
            'status' => true,
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'cabor' => $admin->cabor
            ],
            // 'tim' => $team,
            'tim' => $formatedTim
        ]);
    }

    /**
     * Store a newly created team in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                // 'manager_id' => 'required|integer|exists:users,id',
                'cabor_id' => 'required'
            ]);
            $admin = Auth::user();
            $team = Team::create([
                'name' => $request->name,
                'manager_id' => $admin->id,
                'cabor_id' => $admin->cabor_id, // Force cabor_id from admin
            ]);
            return response()->json([
                'status' => true,
                'message' => 'berhasil input data tim',
                'data' => $team
            ]);
        } catch (Exception $err) {
            return response()->json([
                'status' => false,
                'message' => 'gagal input data tim',
                'error' => $err->getMessage()
            ]);
        }
    }

    /**
     * Display the specified team.
     */
    public function show($id)
    {
        $admin = Auth::user();
        $team = Team::with('manager', 'cabor')->find($id);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        if ($admin->cabor_id !== $team->cabor_id) {
            return response()->json(['message' => 'You are not authorized to view this team'], 403);
        }

        return response()->json($team);
    }

    /**
     * Update the specified team in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'manager_id' => 'sometimes|required|integer|exists:users,id',
        ]);

        $admin = Auth::user();
        $team = Team::find($id);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        if ($admin->cabor_id !== $team->cabor_id) {
            return response()->json(['message' => 'You are not authorized to update this team'], 403);
        }

        // Optional: Validate new manager is in the same cabor
        if ($request->has('manager_id')) {
            $manager = User::find($request->manager_id);
            if (!$manager || $manager->cabor_id !== $admin->cabor_id || $manager->role !== 'manager') {
                return response()->json(['message' => 'Invalid manager selected.'], 422);
            }
        }

        $team->update($request->all());

        return response()->json($team);
    }

    /**
     * Remove the specified team from storage.
     */
    public function destroy($id)
    {
        $admin = Auth::user();
        $team = Team::find($id);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        if ($admin->cabor_id !== $team->cabor_id) {
            return response()->json(['message' => 'You are not authorized to delete this team'], 403);
        }

        $team->delete();

        return response()->json(['message' => 'Team deleted successfully']);
    }
    public function deletePengguna($id){
        $admin = Auth::user();
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil hapus atlet',
            'data' => $user
        ]);
    }

    /**
     * Get all managers for the admin's cabor.
     */
    // public function getManagers()
    // {
    //     $admin = Auth::user();
    //     $managers = User::where('role', 'manager')
    //                     ->where('cabor_id', $admin->cabor_id)
    //                     ->get();
    //     return response()->json($managers);
    // }

    // /**
    //  * Get all coaches for the admin's cabor.
    //  */
    // public function getCoaches()
    // {
    //     $admin = Auth::user();
    //     $coaches = User::where('role', 'coach')
    //                    ->where('cabor_id', $admin->cabor_id)
    //                    ->get();
    //     return response()->json($coaches);
    // }

    // /**
    //  * Get all athletes for the admin's cabor.
    //  */
    // public function getAthletes()
    // {
    //     $admin = Auth::user();
    //     $athletes = User::where('role', 'athlete')
    //                     ->where('cabor_id', $admin->cabor_id)
    //                     ->get();
    //     return response()->json($athletes);
    // }
}
