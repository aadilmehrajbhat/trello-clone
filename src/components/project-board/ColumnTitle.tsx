import { useState, useRef, useEffect, FC } from 'react';

type ColumnTitleProps = {
  title: string;
  onTitleChange: (title: string) => void;
};

const ColumnTitle: FC<ColumnTitleProps> = ({ title, onTitleChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  return (
    <div data-aid="board-title" className="column-title">
      {editable ? (
        <input
          data-aid="input"
          ref={inputRef}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="column-title__input"
          type="text"
          onBlur={() => {
            setEditable(false);
          }}
        />
      ) : (
        <h2
          data-aid="title"
          title="double click to edit"
          className="column-title__text"
          onDoubleClick={() => {
            setEditable(true);
          }}
        >
          {title || <>&nbsp;</>}
        </h2>
      )}
    </div>
  );
};

export default ColumnTitle;
