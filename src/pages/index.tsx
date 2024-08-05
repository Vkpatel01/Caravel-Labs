import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import { initialTasks } from "@/utils/TaskList"; // Import the tasks
import Task from "@/model/Task";

// Interface for filtering tasks
interface FilterTasksArgs {
  groups: number[];
  completed: boolean;
}

export default function Home() {
  // State to hold tasks
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Function to filter tasks by their group and completion status
  const filterTasks = ({ groups, completed }: FilterTasksArgs): Task[] => {
    return tasks.filter(task => groups.includes(task.group) && task.completed === completed);
  };

  // Define group ranges for each section
  const inProgressGroups = [1, 2];
  const toDoGroups = [3, 4, 5, 6, 7, 8, 9, 10];

  // Handle the click event for the "Done" button
  const handleDoneClick = (taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          if (toDoGroups.includes(task.group)) {
            // Move task from To-Do to In Progress
            return { ...task, group: 1 };
          } else if (inProgressGroups.includes(task.group)) {
            // Move task from In Progress to Completed
            return { ...task, completed: true };
          }
        }
        return task;
      });
      return updatedTasks;
    });
  };

  return (
    <>
      <Head>
        <title>Task Board</title>
        <meta name="description" content="Task Board Documentation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Task Board</h1>
        </header>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              To-Do <span className={styles.taskCount}>{filterTasks({ groups: toDoGroups, completed: false }).length}</span>
            </h2>
            {filterTasks({ groups: toDoGroups, completed: false }).map(task => (
              
                <div className={styles.card} key={task.id}>
                <div className={styles.cardHeader}>
                  <span>Task {task.id}: {task.title}</span>
                  <button className={styles.doneButtonin} onClick={() => handleDoneClick(task.id)}>Send {task.id}</button>
                </div>
                <p className={styles.cardDescription}>{task.description}</p>
              </div>
             
              
            ))}
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              In Progress <span className={styles.taskCount}>{filterTasks({ groups: inProgressGroups, completed: false }).length}</span>
            </h2>
            {filterTasks({ groups: inProgressGroups, completed: false }).map(task => (
              <div className={styles.card} key={task.id}>
                <div className={styles.cardHeader}>
                  <span>Task {task.id}: {task.title}</span>
                  <button className={styles.doneButton} onClick={() => handleDoneClick(task.id)}>Done {task.id}</button>
                </div>
                <p className={styles.cardDescription}>{task.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Completed <span className={styles.taskCount}>{filterTasks({ groups: inProgressGroups, completed: true }).length}</span>
            </h2>
            {filterTasks({ groups: inProgressGroups, completed: true }).map(task => (
              <div className={styles.card} key={task.id}>
                <div className={styles.cardHeader}>
                  <span>Task {task.id}: {task.title}</span>
                  <button className={styles.doneButton} disabled>✔ Done</button>
                </div>
                <p className={styles.cardDescription}>{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
