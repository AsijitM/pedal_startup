import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { toast } from 'sonner';
import axios from 'axios';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';


const taskSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title cannot exceed 50 characters'),
  description: z
    .string()
    .max(255, 'Description cannot exceed 255 characters')
    .nonempty(),
});

export default function EditTaskDialog({ taskId, fetchData }) {
  const [date, setDate] = useState(null);
  console.log(taskId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: '', description: '' },
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `/tasks/${taskId}`
        );
        const task = response.data;

        console.log(task);
        setValue('title', task.title);
        setValue('description', task.description);
        // setDate(format(task.dueDate));
      } catch (error) {
        console.error('Error fetching task:', error);
        toast(error.response?.data?.message || 'Error fetching task');
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId, setValue]);

  const onSubmit = async (data) => {
    try {
      const dataToSend = { ...data, dueDate: date };
      const response = await axios.put(
        `/tasks/${taskId}`,
        dataToSend
      );
      console.log('Task updated successfully:', response.data);
      toast('Task Updated');
      reset();
      setDate(null);
      fetchData();
    } catch (error) {
      console.error('Error updating task:', error);
      toast(error.response?.data?.message || 'Error updating task');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="text-slate-950" size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update details for your task.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" {...register('title')} className="col-span-3" />
            </div>
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                {...register('description')}
                className="col-span-3"
              />
            </div>
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
