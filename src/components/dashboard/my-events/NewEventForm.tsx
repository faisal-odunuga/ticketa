'use client';
import Button from '@/components/ui/button/Button';
import FormInput from '@/components/ui/form-input/FormInput';
import Loader from '@/components/ui/loader/Loader';
import SelectInput from '@/components/ui/select-input/SelectInput';
import { NewEventFormValues, ToggleFormProps } from '@/hooks/definitions';
import { createEvent } from '@/services/apiEvents';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';

const NewEventForm = ({ setShowForm }: ToggleFormProps) => {
  const { register, handleSubmit, control, reset } = useForm<NewEventFormValues>({
    defaultValues: {
      ticketTypes: [{ name: 'Regular', price: 0, sold_tickets: 0, total_tickets: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ticketTypes',
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success('Event created successfully!');
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['user-events'] });
      setShowForm(false);
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data: NewEventFormValues) => {
    // Ensure all ticket types have available tickets
    const allValidTickets = data.ticketTypes.every((ticket) => ticket.total_tickets > 0);

    if (!allValidTickets) {
      toast.error('Each ticket type must have at least 1 available ticket');
      return;
    }

    mutation.mutate(data);
  };

  return (
    <section className='bg-white max-w-4xl mx-auto rounded-lg border shadow-sm'>
      <header className='flex flex-col space-y-1.5 p-6'>
        <h3 className='font-semibold tracking-tight text-2xl'>Create New Event</h3>
      </header>

      <main className='p-6 pt-0'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Left side */}
            <div className='space-y-4'>
              <FormInput
                id='title'
                type='text'
                placeholder='Enter event title'
                required
                label='Event Title'
                {...register('title', { required: 'This field is required' })}
              />

              <SelectInput id='category' required label='Category' {...register('category')}>
                <option value=''>Select category</option>
                <option value='Music'>Music</option>
                <option value='Sports'>Sports</option>
                <option value='Technology'>Technology</option>
                <option value='Arts'>Arts</option>
                <option value='Food & Drink'>Food & Drink</option>
                <option value='Business'>Business</option>
              </SelectInput>

              <FormInput
                id='startDate'
                type='datetime-local'
                required
                label='Start Date'
                {...register('startDate')}
              />

              <FormInput
                id='endDate'
                type='datetime-local'
                required
                label='End Date'
                {...register('endDate')}
              />

              <FormInput
                id='venue'
                type='text'
                placeholder='Enter venue name'
                required
                label='Venue'
                {...register('venue')}
              />

              <FormInput
                id='location'
                type='text'
                placeholder='City, State'
                required
                label='Location'
                {...register('location')}
              />
            </div>

            {/* Right side */}
            <div className='space-y-4'>
              <div>
                <label htmlFor='description' className='text-sm font-medium leading-none'>
                  Description *
                </label>
                <textarea
                  id='description'
                  placeholder='Describe your event...'
                  required
                  rows={4}
                  className='flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2'
                  {...register('description')}
                ></textarea>
              </div>

              {/* Ticket Types Section */}
              <div className='space-y-3'>
                <h4 className='font-semibold text-lg'>Ticket Types</h4>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className='grid grid-cols-3 gap-3 items-end border p-3 rounded-md'
                  >
                    <FormInput
                      id={`ticketTypes.${index}.name`}
                      type='text'
                      placeholder='Regular / VIP'
                      label='Type'
                      required
                      {...register(`ticketTypes.${index}.name` as const, {
                        required: 'Ticket type is required',
                      })}
                    />

                    <FormInput
                      id={`ticketTypes.${index}.price`}
                      type='number'
                      min='0'
                      placeholder='0.00'
                      label='Price'
                      required
                      {...register(`ticketTypes.${index}.price` as const, {
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: 'Price cannot be negative',
                        },
                      })}
                    />

                    <FormInput
                      id={`ticketTypes.${index}.total_tickets`}
                      type='number'
                      min='1'
                      placeholder='100'
                      label='Available'
                      required
                      {...register(`ticketTypes.${index}.total_tickets` as const, {
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: 'Available tickets must be at least 1',
                        },
                      })}
                    />

                    {index > 0 && (
                      <Button
                        type='button'
                        onClick={() => remove(index)}
                        btnText='Remove'
                        filled={false}
                      />
                    )}
                  </div>
                ))}

                <Button
                  type='button'
                  btnText='+ Add Ticket Type'
                  onClick={() => append({ name: '', price: 0, total_tickets: 1, sold_tickets: 0 })}
                />
              </div>

              <FormInput
                id='bannerUrl'
                type='file'
                accept='image/*'
                required
                label='Upload Image banner (Max 1MB, only images)'
                {...register('bannerUrl')}
              />
            </div>
          </div>

          <div className='flex justify-end space-x-4 pt-6 border-t'>
            <Button filled={false} btnText='Cancel' onClick={() => setShowForm(false)} />
            <Button
              type='submit'
              btnText={mutation.isPending ? 'Creating...' : 'Create Event'}
              loading={mutation.isPending}
            />
          </div>
        </form>
      </main>
    </section>
  );
};

export default NewEventForm;
