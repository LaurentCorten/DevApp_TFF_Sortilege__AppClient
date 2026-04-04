
// For SignalR connection operations that return no data
export type ConnectionResult =
    | { success: true }
    | { success: false; error: string };