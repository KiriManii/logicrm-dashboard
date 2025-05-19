// src/utils/scheduler.ts
import { useEffect, useState } from 'react';

type Task = () => Promise<void>;

interface ScheduledTask {
  id: string;
  task: Task;
  interval: number; // in milliseconds
  lastRun?: Date;
}

export const useScheduler = () => {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  
  const addTask = (task: Task, interval: number): string => {
    const id = Date.now().toString();
    setTasks(prev => [...prev, { id, task, interval }]);
    return id;
  };
  
  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    // Set up intervals for each task
    tasks.forEach(scheduledTask => {
      const interval = setInterval(async () => {
        try {
          await scheduledTask.task();
          setTasks(prev => 
            prev.map(task => 
              task.id === scheduledTask.id 
                ? { ...task, lastRun: new Date() } 
                : task
            )
          );
        } catch (error) {
          console.error(`Error running scheduled task ${scheduledTask.id}:`, error);
        }
      }, scheduledTask.interval);
      
      intervals.push(interval);
    });
    
    // Clean up intervals on unmount
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [tasks]);
  
  return { addTask, removeTask, tasks };
};
