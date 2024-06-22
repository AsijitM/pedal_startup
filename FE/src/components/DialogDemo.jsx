// DialogDemo.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Import the schema defined with zod
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// schemas.js
import { z } from 'zod';
import { toast } from 'sonner';
import axios from 'axios';

import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

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
    .min(10, 'Description must be at least 10 characters')
    .max(255, 'Description cannot exceed 255 characters')
    .nonempty(),
});

export default function DialogDemo({ title, fetchData }) {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!date) throw new Error('All fields are must');
      const dataToSend = { ...data, dueDate: date };
      const response = await axios.post('/tasks', dataToSend);
      console.log('Form submitted successfully:', response.data);
      toast('New Task Created');
      setDate(null);
      reset();
      fetchData();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Enter details for your new task.
          </DialogDescription>
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
              <Label htmlFor="description" className="text-right">
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
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit">Create Task</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
