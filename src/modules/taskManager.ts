
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";



let tasks: Task[] = [...initialTasks];

export function initializeTasks() {

}
//@ts-ignore
export function getActiveTasks(): Task[] {
 
}
//@ts-ignore
export function getCompletedTasks(): Task[] {
 
}
//@ts-ignore
export function getAllTasks(): Task[] {
 
}

export function completeTask(taskTitle: string): void {
  
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
 
}

export function deleteTask(taskId: number): void {
 
}
