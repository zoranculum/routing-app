import cx from "classnames";
import "./header.css";

export const Header = () => {
  const classNames = cx(["header"]);
  return <div className={classNames}>Route drawer</div>;
};
