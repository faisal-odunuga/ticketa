"use client";
import Button from "@/components/ui/button/Button";
import FormInput from "@/components/ui/form-input/FormInput";
import SelectInput from "@/components/ui/select-input/SelectInput";
import { EventCardProps, ToggleFormProps } from "@/hooks/definitions";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const NewEventForm = ({ setShowForm }: ToggleFormProps) => {
  // const { register, handleSubmit } = useForm();

  // function onSubmit(data: EventCardProps) {
  //   alert("Submitted");
  //   console.log(data);
  // }
  function onError(error) {
    console.log(error);
  }
  const { register, handleSubmit } = useForm<EventCardProps>();

  const onSubmit: SubmitHandler<EventCardProps> = (data) => {
    alert("Submitted");
    console.log(data);
  };

  return (
    <section className="bg-white max-w-4xl mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
      <header className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-2xl">
          Create New Event
        </h3>
      </header>

      <main className="p-6 pt-0">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <FormInput
                  id="title"
                  type="text"
                  placeholder="Enter event title"
                  required
                  label="Event Title"
                  {...register("title", { required: "This field is required" })}
                />
              </div>
              <div>
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
              </div>
              <div>
                <FormInput
                  id="startDate"
                  type="datetime-local"
                  required
                  label="Start Date"
                  {...register("startDate")}
                />
              </div>

              <div>
                <FormInput
                  id="endDate"
                  type="datetime-local"
                  required
                  label="End Date"
                  {...register("endDate")}
                />
              </div>

              <div>
                <FormInput
                  id="venue"
                  type="text"
                  placeholder="Enter venue name"
                  required
                  label="Venue"
                  {...register("venue")}
                />
              </div>
              <div>
                <FormInput
                  id="location"
                  type="text"
                  placeholder="City, State"
                  required
                  label="Location"
                  {...register("location")}
                />
              </div>
            </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormInput
                    id="price"
                    type="number"
                    min="0"
                    placeholder="0.00"
                    required
                    label="Ticket Price ($)"
                    {...register("price")}
                  />
                </div>
                <div>
                  <FormInput
                    id="totalTickets"
                    type="number"
                    min="0"
                    placeholder="100"
                    required
                    label="Total ticket"
                    {...register("totalTickets")}
                  />
                </div>
              </div>

              <div>
                <FormInput
                  id="bannerUrl"
                  type="file"
                  accept="image/*"
                  required
                  label="Upload Image banner (Max 1MB, only images)"
                  {...register("bannerUrl")}
                />
              </div>
              <div>
                <FormInput
                  id="organizer"
                  type="text"
                  placeholder="Your organization name"
                  required
                  label="Organizer Name"
                  {...register("organizer")}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              filled={false}
              btnText="Cancel"
              onClick={() => setShowForm(false)}
            />
            <Button
              type="submit"
              btnText="Create Event"
              // onClick={() => setShowForm(false)}
            />
          </div>
        </form>
      </main>
    </section>
  );
};

export default NewEventForm;
