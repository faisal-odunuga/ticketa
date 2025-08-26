"use client";
import Button from "@/components/ui/button/Button";
import FormInput from "@/components/ui/form-input/FormInput";
import SelectInput from "@/components/ui/select-input/SelectInput";
import { NewEventFormValues, ToggleFormProps } from "@/hooks/definitions";
import { createEvent } from "@/services/apiEvents";
import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

const NewEventForm = ({ setShowForm }: ToggleFormProps) => {
  const { register, handleSubmit, control } = useForm<NewEventFormValues>({
    defaultValues: {
      ticketTypes: [{ name: "Regular", price: 0, total_tickets: 0 }], // one default ticket
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ticketTypes",
  });

  const onSubmit: SubmitHandler<NewEventFormValues> = (data) => {
    createEvent(data);
  };

  return (
    <section className="bg-white max-w-4xl mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
      <header className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-2xl">
          Create New Event
        </h3>
      </header>

      <main className="p-6 pt-0">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side */}
            <div className="space-y-4">
              <FormInput
                id="title"
                type="text"
                placeholder="Enter event title"
                required
                label="Event Title"
                {...register("title", { required: "This field is required" })}
              />

              <SelectInput
                id="category"
                required
                label="Category"
                {...register("category")}
              >
                <option value="">Select category</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
                <option value="Arts">Arts</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Business">Business</option>
              </SelectInput>

              <FormInput
                id="startDate"
                type="datetime-local"
                required
                label="Start Date"
                {...register("startDate")}
              />

              <FormInput
                id="endDate"
                type="datetime-local"
                required
                label="End Date"
                {...register("endDate")}
              />

              <FormInput
                id="venue"
                type="text"
                placeholder="Enter venue name"
                required
                label="Venue"
                {...register("venue")}
              />

              <FormInput
                id="location"
                type="text"
                placeholder="City, State"
                required
                label="Location"
                {...register("location")}
              />
            </div>

            {/* Right side */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-medium leading-none"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  placeholder="Describe your event..."
                  required
                  rows={4}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...register("description")}
                ></textarea>
              </div>

              {/* Ticket Types Section */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Ticket Types</h4>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-3 gap-3 items-end border p-3 rounded-md"
                  >
                    <FormInput
                      id={`ticketTypes.${index}.name`}
                      type="text"
                      placeholder="Regular / VIP"
                      label="Type"
                      {...register(`ticketTypes.${index}.name` as const)}
                    />

                    <FormInput
                      id={`ticketTypes.${index}.price`}
                      type="number"
                      min="0"
                      placeholder="0.00"
                      label="Price"
                      {...register(`ticketTypes.${index}.price` as const, {
                        valueAsNumber: true,
                      })}
                    />

                    <FormInput
                      id={`ticketTypes.${index}.total_tickets`}
                      type="number"
                      min="0"
                      placeholder="100"
                      label="Available"
                      {...register(
                        `ticketTypes.${index}.total_tickets` as const,
                        {
                          valueAsNumber: true,
                        }
                      )}
                    />

                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        btnText="Remove"
                        filled={false}
                      />
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  btnText="+ Add Ticket Type"
                  onClick={() =>
                    append({ name: "", price: 0, total_tickets: 0 })
                  }
                />
              </div>

              <FormInput
                id="bannerUrl"
                type="file"
                accept="image/*"
                required
                label="Upload Image banner (Max 1MB, only images)"
                {...register("bannerUrl")}
              />

              {/* <FormInput
                id="organizer"
                type="text"
                placeholder="Your organization name"
                required
                label="Organizer Name"
                {...register("organizer")}
              /> */}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              filled={false}
              btnText="Cancel"
              onClick={() => setShowForm(false)}
            />
            <Button type="submit" btnText="Create Event" />
          </div>
        </form>
      </main>
    </section>
  );
};

export default NewEventForm;
