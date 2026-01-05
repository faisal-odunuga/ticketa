'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import FormInput from '../form-input/FormInput';
import SelectInput from '../select-input/SelectInput';
import { useUserEvents } from '@/state/EventsContext';
import { SentenseCase } from '@/utils/helpers';

export default function Filters() {
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
    <div className='flex flex-col md:flex-row items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl'>
      {/* Category select */}
      <div className='w-full md:w-1/3 relative group'>
        <SelectInput
          defaultValue={searchParams.get('category') || ''}
          onChange={(e) => updateQuery('category', e.target.value)}
          className='w-full h-12 bg-white/90 border-0 rounded-xl px-4 text-gray-800 focus:ring-2 focus:ring-accent transition-all cursor-pointer group-hover:bg-white'
        >
          <option value=''>All Categories</option>
          {!isLoadingCategories &&
            categories.map((cat) => (
              <option key={cat} value={cat}>
                {SentenseCase(cat)}
              </option>
            ))}
        </SelectInput>
      </div>

      {/* Search input */}
      <div className='w-full md:w-2/3 relative group'>
        <FormInput
          type='search'
          placeholder='Search by event, location, or venue...'
          defaultValue={searchParams.get('search') || ''}
          onChange={(e) => updateQuery('search', e.target.value)}
          className='w-full h-12 bg-white/90 border-0 rounded-xl px-4 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-accent transition-all group-hover:bg-white'
        />
      </div>
    </div>
  );
}
