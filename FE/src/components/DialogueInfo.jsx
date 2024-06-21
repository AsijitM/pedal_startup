import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import axios from 'axios';
import { format } from 'date-fns';
import { InfoIcon } from 'lucide-react';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const DialogueInfo = ({ id }) => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`/tasks/${id}`);
      setData(response.data);
    } catch (error) {
      toast('Error fetching information');
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger>
        <InfoIcon size={20} className="text-blue-600" />{' '}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Information</DialogTitle>
          <DialogDescription className="font-bold text-2xl">
            {data?.title}
          </DialogDescription>
          <DialogDescription className="text-xl font-semibold">
            {data?.description}
          </DialogDescription>
          <DialogDescription>
            {data?.dueDate
              ? format(new Date(data.dueDate), 'PPP')
              : 'No due date'}
          </DialogDescription>
          <DialogDescription
            className={`text-base font-mono uppercase ${
              data?.status ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {data?.status ? 'Completed' : 'Incomplete'}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogueInfo;
