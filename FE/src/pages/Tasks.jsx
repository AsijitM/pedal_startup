import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import DialogDemo from '@/components/DialogDemo';
import { toast } from 'sonner';
import DialogueInfo from '@/components/DialogueInfo';
import EditTaskDialog from '@/components/EditTaskdialogue';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { BadgeMinus } from 'lucide-react';
import SkeletonTask from '@/components/SkeletonTask';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/tasks');
      if (!response.data) {
        throw new Error('Failed to fetch tasks');
      }
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle checkbox change and update task completion status
  const handleCheckboxChange = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    try {
      await axios.put(`/tasks/${taskId}`, {
        completed: !taskToUpdate.completed,
      });
      toast('Task Marked as complete');
      fetchTasks(); // Fetch updated tasks after successful update
    } catch (error) {
      setTasks(tasks); // Revert state on error
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/tasks/${id}`);
      toast(response.data?.message);
      fetchTasks();
    } catch (error) {
      toast(error.response?.data?.message || 'Error deleting Task');
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Create button in top right corner */}
      <div className="font-bold py-2 px-4 rounded absolute top-4 right-4">
        <DialogDemo title="Create" fetchData={fetchTasks} />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="overflow-x-auto max-w-full">
          {/* Task table */}
          {loading ? (
            <SkeletonTask />
          ) : (
            <Table className="table-auto">
              <TableCaption className="text-lg font-bold mb-4">
                A list of your recent tasks.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              {/* Conditional rendering based on loading state */}

              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell className="font-medium">
                      {task.completed ? (
                        <Checkbox checked={task.completed} />
                      ) : (
                        <Checkbox
                          onCheckedChange={() => handleCheckboxChange(task._id)}
                        />
                      )}
                    </TableCell>
                    <TableCell className={task.completed ? 'line-through' : ''}>
                      {task.title}
                    </TableCell>
                    <TableCell className={task.completed ? 'line-through' : ''}>
                      {task.dueDate
                        ? format(new Date(task.dueDate), 'PPP')
                        : 'No due date'}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row gap-3">
                        {/* Assuming BadgeMinus icon for deleting */}
                        <BadgeMinus
                          onClick={() => handleDelete(task._id)}
                          className="text-red-700"
                          size={20}
                        />
                        <DialogueInfo id={task._id} />
                        {!task.completed && (
                          <EditTaskDialog
                            taskId={task._id}
                            fetchData={fetchTasks}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {loading && (
            <div className="text-center text-bold">
              <p>List of Tasks is Loading..</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
