const RANK_THRESHOLDS = [
    { level: 60, rank: "Full-Stack developer" },
    { level: 55, rank: "Confirmed developer" },
    { level: 50, rank: "Junior developer" },
    { level: 40, rank: "Basic developer" },
    { level: 30, rank: "Assistant developer" },
    { level: 20, rank: "Apprentice developer" },
    { level: 10, rank: "Beginner developer" },
    { level: 0, rank: "Aspiring developer" },
] as const;

const COHORT_IDS = [
    { eventID: 1, cohort: 1 },
    { eventID: 2, cohort: 2 },
    { eventID: 3, cohort: 3 },
    { eventID: 4, cohort: 4 },
    { eventID: 5, cohort: 5 },
    { eventID: 6, cohort: 6 },
    { eventID: 7, cohort: 7 },
    { eventID: 8, cohort: 8 },
    { eventID: 9, cohort: 9 },
    { eventID: 10, cohort: 10 },
] as const;

export function getRank(level: number): string {
    const { rank } = RANK_THRESHOLDS.find(({ level: threshold }) => level >= threshold)
    ?? RANK_THRESHOLDS[RANK_THRESHOLDS.length - 1];
    return rank;
}

export function getCohort(eventID: number): number {
    return COHORT_IDS.find(({ eventID: id }) => id === eventID)?.cohort ?? 0;
}

export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}