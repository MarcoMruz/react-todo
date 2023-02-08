import { FormikErrors } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { convertISOStringToString } from '../../helpers/date.helpers';
import { Input, VStack, Textarea, HStack } from '../common';
import { Tag } from '../common/tag';

export type FormValues = {
  title: string;
  description?: string;
  deadline?: string;
  tags?: string[];
  completed?: boolean;
};

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  values: FormValues;
  errors: FormikErrors<FormValues>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSetFieldValue: (field: string, value: any) => void;
  onReset?: () => void;
};

export const TodoForm = ({
  onSubmit,
  values,
  errors,
  onChange,
  onSetFieldValue,
}: Props) => {
  const [tagInput, setTagInput] = useState('');

  const handleOnAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && tagInput.trim() !== '') {
      if (tagInput) {
        onSetFieldValue('tags', [
          ...new Set([...(values.tags || []), tagInput]),
        ]);
        e.currentTarget.value = '';
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
    <form onSubmit={onSubmit}>
      <VStack>
        <label htmlFor="title">Title</label>
        <Input
          name="title"
          value={values.title}
          onChange={onChange}
          invalid={errors.title != null}
        />

        <label htmlFor="description">Description</label>
        <Textarea
          name="description"
          value={values.description}
          onChange={onChange}
          invalid={errors.description != null}
        />

        <label htmlFor="deadline">Deadline</label>
        <Input
          name="deadline"
          type="datetime-local"
          value={convertISOStringToString(values.deadline)}
          onChange={onChange}
          invalid={errors.deadline != null}
        />

        <label htmlFor="tags">Tags</label>
        {values.tags?.map((tag, index) => (
          <HStack key={index}>
            <Tag
              label={tag}
              onClick={() => handleOnRemoveTag(tag)}
              className="cursor-pointer"
              title="By clicking you can remove this tag"
            />
          </HStack>
        ))}
        <Input
          placeholder="Press Enter to add a tag"
          name="tags"
          value={values.tags}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleOnAddTag}
          invalid={errors.tags != null}
        />
      </VStack>
    </form>
  );
};
