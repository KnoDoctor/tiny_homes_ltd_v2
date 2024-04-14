'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updatePost } from '@/app/lib/actions/posts';
import {
  UserCircleIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import {
  BiasField,
  CategoryField,
  ParticipantField,
  SportField,
  UserField,
} from '@/app/lib/definitions';

export default function EditPostForm({
  post,
  users,
  categories,
}: {
  post: any;
  users: UserField[];
  categories: CategoryField[];
}) {
  const initialState = { message: null, errors: {} };
  const updatePostWithId = updatePost.bind(null, post.id);
  const [state, dispatch] = useFormState(updatePostWithId, initialState);

  return (
    <>
      <form action={dispatch}>
        {/* Submit */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/posts"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Save Post</Button>
        </div>
        <div className="mt-2 rounded-md bg-gray-50 p-4 md:p-6">
          {/* Post Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Post title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter post's full title"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                  defaultValue={post.title}
                  // required
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div id="post-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Post Image */}
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="mb-2 block text-sm font-medium"
            >
              Post image
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  placeholder="Enter post's image url"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                  defaultValue={post.image_url}
                  // required
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div id="post-error" aria-live="polite" aria-atomic="true">
              {state.errors?.imageUrl &&
                state.errors.imageUrl.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Post Content */}
          <div className="mb-4">
            <label htmlFor="content" className="mb-2 block text-sm font-medium">
              Post content
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <textarea
                  id="content"
                  name="content"
                  rows={15}
                  // type="text"
                  placeholder="Enter post's full content"
                  className="peer block w-full overflow-y-scroll rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="amount-error"
                  defaultValue={post.content}
                  // required
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div id="post-error" aria-live="polite" aria-atomic="true">
              {state.errors?.content &&
                state.errors.content.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* User */}
          <div className="mb-4">
            <label htmlFor="user" className="mb-2 block text-sm font-medium">
              Choose user
            </label>
            <div className="relative">
              <select
                id="user"
                name="userId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={post.userId}
                // required
                aria-describedby="user-error"
              >
                <option value="" disabled>
                  Select a user
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="study-error" aria-live="polite" aria-atomic="true">
              {state.errors?.userId &&
                state.errors.userId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium"
            >
              Choose category
            </label>
            <div className="relative">
              <select
                id="category"
                name="categoryId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={post.categoryId}
                // required
                aria-describedby="category-error"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="study-error" aria-live="polite" aria-atomic="true">
              {state.errors?.categoryId &&
                state.errors.categoryId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <fieldset>
            <legend className="mb-4 block text-sm font-medium">
              Feature post status
            </legend>
            {/*Is Feature*/}
            <div className="mb-4 flex items-center">
              <input
                defaultChecked={post.is_feature}
                id="isFeature"
                name="isFeature"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
              />
              <label
                htmlFor="isFeature"
                className="ms-2 text-sm font-medium text-gray-900 "
              >
                Is Feature Post?
              </label>
            </div>
            <div id="study-error" aria-live="polite" aria-atomic="true">
              {state.errors?.isFeature &&
                state.errors.isFeature.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            {/*Is Sub Feature*/}
            <div className="mb-4 flex items-center">
              <input
                defaultChecked={post.is_sub_feature}
                id="isSubFeature"
                name="isSubFeature"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
              />
              <label
                htmlFor="isSubFeature"
                className="ms-2 text-sm font-medium text-gray-900 "
              >
                Is Sub Feature Post?
              </label>
            </div>
            <div id="study-error" aria-live="polite" aria-atomic="true">
              {state.errors?.isSubFeature &&
                state.errors.isSubFeature.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

            {/*Is Featured Carousel*/}
            <div className="mb-4 flex items-center">
              <input
                defaultChecked={post.is_featured_carousel}
                id="isFeaturedCarousel"
                name="isFeaturedCarousel"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
              />
              <label
                htmlFor="isFeaturedCarousel"
                className="ms-2 text-sm font-medium text-gray-900 "
              >
                Is Featured Carousel Post?
              </label>
            </div>
            <div id="study-error" aria-live="polite" aria-atomic="true">
              {state.errors?.isFeaturedCarousel &&
                state.errors.isFeaturedCarousel.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>

          {/* Post Status
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set the post status
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="draft"
                    name="status"
                    type="radio"
                    value="draft"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-50 text-gray-500 focus:ring-2"
                    defaultChecked={post.status === 'draft'}
                  />
                  <label
                    htmlFor="draft"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500"
                  >
                    Draft <PencilIcon className="h-4 w-4" />
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="finalized"
                    name="status"
                    type="radio"
                    value="finalized"
                    className="h-4 w-4 cursor-pointer border-yellow-300 bg-yellow-50 text-yellow-600 focus:ring-2" // Swapped to yellow
                    defaultChecked={post.status === 'finalized'}
                  />
                  <label
                    htmlFor="finalized"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-600" // Swapped to yellow
                  >
                    Finalized <CheckCircleIcon className="h-4 w-4" />
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="cancelled"
                    name="status"
                    type="radio"
                    value="cancelled"
                    className="h-4 w-4 cursor-pointer border-red-300 bg-red-50 text-red-600 focus:ring-2"
                    defaultChecked={post.status === 'cancelled'}
                  />
                  <label
                    htmlFor="cancelled"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600"
                  >
                    Cancelled <XCircleIcon className="h-4 w-4" />
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="in_progress"
                    name="status"
                    type="radio"
                    value="in_progress"
                    className="h-4 w-4 cursor-pointer border-blue-300 bg-blue-50 text-blue-600 focus:ring-2"
                    defaultChecked={post.status === 'in_progress'}
                  />
                  <label
                    htmlFor="in_progress"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600"
                  >
                    In Progress <ClockIcon className="h-4 w-4" />
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="complete"
                    name="status"
                    type="radio"
                    value="complete"
                    className="h-4 w-4 cursor-pointer border-green-300 bg-green-50 text-green-600 focus:ring-2" // Swapped to green
                    defaultChecked={post.status === 'complete'}
                  />
                  <label
                    htmlFor="complete"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600" // Swapped to green
                  >
                    Complete <DocumentCheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status &&
                state.errors.status.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset> */}
        </div>
      </form>
    </>
  );
}
