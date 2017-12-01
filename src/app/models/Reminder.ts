export interface Reminder {
    $key?: string;
    title?: string;
    description?: string;
    dateTimeOfRemind?: number;
    tags?: string[];
}