import { FormikErrors } from 'formik';
import { useState } from 'react';
import { convertISOStringToString } from '../../helpers/date.helpers';
import { Input, VStack, Textarea, HStack, Text } from '../common';
import { Tag } from '../common/tag';

export type FormValues = {
  title: string;
  description?: string;
  deadline?: string;
  tags?: string[];
  completed?: boolean;
};

type Props = {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  isSubmitting?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSetFieldValue: (field: string, value: any) => void;
  onReset?: () => void;
};

export const TodoForm = ({
  values,
  errors,
  isSubmitting,
  onSubmit,
  onChange,
  onSetFieldValue,
}: Props) => {
  const [tagInput, setTagInput] = useState('');

  const handleOnAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (tagInput) {
        onSetFieldValue('tags', [
          ...new Set([...(values.tags || []), tagInput]),
        ]);
        setTagInput('');
      }
    }
  };

  const handleOnRemoveTag = (tag: string) => {
    onSetFieldValue(
      'tags',
      values.tags?.filter((t) => t !== tag)
    );
  };

  return (
    <form onSubmit={onSubmit} className="p-5">
      <fieldset disabled={isSubmitting}>
        <VStack>
          <label htmlFor="title">Title</label>
          <Input
            name="title"
            value={values.title}
            onChange={onChange}
            invalid={errors.title != null}
          />
          {errors.title && (
            <Text color="red" size="sm">
              {errors.title}
            </Text>
          )}

          <label htmlFor="description">Description</label>
          <Textarea
            name="description"
            value={values.description}
            onChange={onChange}
            invalid={errors.description != null}
          />
          {errors.description && (
            <Text color="red" size="sm">
              {errors.description}
            </Text>
          )}

          <label htmlFor="deadline">Deadline</label>
          <Input
            name="deadline"
            type="datetime-local"
            value={values.deadline}
            onChange={onChange}
            invalid={errors.deadline != null}
          />
          {errors.deadline && (
            <Text color="red" size="sm">
              {errors.deadline}
            </Text>
          )}

          <label htmlFor="tags">Tags</label>
          <HStack spacing={1} className="my-2">
            {values.tags?.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                onClick={() => handleOnRemoveTag(tag)}
                className="cursor-pointer"
                title="By clicking you can remove this tag"
              />
            ))}
          </HStack>
          <Input
            placeholder="Press Enter to add a tag"
            name="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleOnAddTag}
            invalid={errors.tags != null}
          />
          {errors.tags && (
            <Text color="red" size="sm">
              {errors.tags}
            </Text>
          )}
        </VStack>

        <input type="submit" hidden />
      </fieldset>
    </form>
  );
};
