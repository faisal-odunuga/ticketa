"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "../form-input/FormInput";
import SelectInput from "../select-input/SelectInput";
import { useUserEvents } from "@/state/EventsContext";
import { SentenseCase } from "@/utils/helpers";

export default await function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };
  const { categories, isLoadingCategories } = useUserEvents();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-3/4">
      {/* Category select */}
      <SelectInput
        defaultValue={searchParams.get("category") || ""}
        onChange={(e) => updateQuery("category", e.target.value)}
        className="border rounded px-3 py-2 text-black !w-full !h-full"
      >
        <option value="">All Categories</option>
        {!isLoadingCategories &&
          categories.map((cat) => (
            <option key={cat} value={cat}>
              {SentenseCase(cat)}
            </option>
          ))}
      </SelectInput>
      {/* Search input */}
      <FormInput
        type="search"
        placeholder="Search events..."
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => updateQuery("search", e.target.value)}
        className="border rounded px-3 py-2 flex-1 !w-full text-black"
      />
    </div>
  );
};
