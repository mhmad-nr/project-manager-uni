import { ProjectType, StatusEnum, TaskType } from "../types"

export const filterString = (str: string, max: number) => str.substring(0, max) + "..."
export const getRole = (isManager: boolean) => isManager ? "User" : "Manager"
export const getNextStatus = (status: StatusEnum) => {
    if (status == StatusEnum.OPEN) {
        return StatusEnum.IN_PROGRESS

    }
    return StatusEnum.DONE
}

export const getData = (dateString: string): string => {

    const dateObject = new Date(dateString);

    return dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
export function sortByStatus(items: TaskType[]): TaskType[] {
    // Define the order in which tasks should be sorted
    const statusOrder: Record<StatusEnum, number> = {
        [StatusEnum.OPEN]: 1,
        [StatusEnum.IN_PROGRESS]: 2,
        [StatusEnum.DONE]: 3
    };

    // Sort tasks based on their status
    items.sort((taskA, taskB) => {
        const orderA = statusOrder[taskA.status];
        const orderB = statusOrder[taskB.status];

        return orderA - orderB;
    });

    return items;
}