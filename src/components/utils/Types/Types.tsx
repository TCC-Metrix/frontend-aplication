export type ButtonProps = {
  name: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickFunction: React.Dispatch<React.SetStateAction<boolean>>
}