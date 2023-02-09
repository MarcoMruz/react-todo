import { Button, HStack, Input, VStack } from '../common';

type Props = {
  className?: string;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onToggleCompleted: () => void;
  onToggleUncompleted: () => void;
  onToggleAll: () => void;
  onSortByDeadline: () => void;
};

export const TodoSearchbar = ({
  onClear,
  onSortByDeadline,
  onToggleAll,
  onToggleCompleted,
  onToggleUncompleted,
  onSearchChange,
  className,
  searchTerm,
}: Props) => {
  return (
    <VStack className={className} align="center" spacing={5}>
      <HStack justify="evenly" className="w-full">
        <button onClick={onToggleAll} className="btn btn-outline-primary">
          Show All
        </button>
        <button onClick={onToggleCompleted} className="btn btn-outline-primary">
          Only Completed
        </button>
        <button
          onClick={onToggleUncompleted}
          className="btn btn-outline-primary"
        >
          Only Uncompleted
        </button>
        <button onClick={onSortByDeadline} className="btn btn-outline-primary">
          Sort By Deadline
        </button>
      </HStack>
      <HStack spacing={2} className="w-full">
        <Input
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="What are you looking for?"
        />
        <Button onClick={onClear} colorScheme="danger">
          Clear
        </Button>
      </HStack>
    </VStack>
  );
};
