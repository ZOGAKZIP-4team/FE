import styled from "styled-components";
import { useState } from "react";
import dropdownIcon from "../assets/dropdownIcon.svg";
import PropTypes from "prop-types";

// DropDown 컴포넌트
const DropDown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("최신순");

  // 토글 클릭 이벤트
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //항목 클릭 이벤트
  const handleItemClick = (item, value) => {
    setSelectedItem(item);
    setIsOpen(false); // 선택 후 드롭다운 닫기
    if (onSelect) {
      onSelect(value);
    }
    // onSelect(item);
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggleDropdown}>
        {selectedItem}
        <DropDownIcon src={dropdownIcon} />
      </DropDownHeader>
      {isOpen && (
        <DropDownList>
          <DropDownItem
            item="최신순"
            value="latest"
            onClick={handleItemClick}
            selected={selectedItem === "최신순"}
          />
          <DropDownItem
            item="댓글순"
            value="mostPosted"
            onClick={handleItemClick}
            selected={selectedItem === "댓글순"}
          />
          <DropDownItem
            item="공감순"
            value="mostLiked"
            onClick={handleItemClick}
            selected={selectedItem === "공감순"}
          />
        </DropDownList>
      )}
    </DropDownContainer>
  );
};

export default DropDown;

const DropDownItem = ({ item, value, onClick, selected }) => {
  return (
    <DropDownItemContainer
      onClick={() => onClick(item, value)}
      selected={selected}
    >
      {item}
    </DropDownItemContainer>
  );
};

// Styled components
const DropDownContainer = styled.div`
  position: relative;
  width: 160px;
  height: 171px;
`;

const DropDownIcon = styled.img`
  display: flex;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 1rem;
  cursor: pointer;
`;

const DropDownHeader = styled.div`
  background-color: white;
  border: 1px solid #282828;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  max-width: 160px;
  max-height: 45px;
  padding: 10px 19px;
`;

const DropDownList = styled.ul`
  position: absolute;
  margin-top: 0.0625rem;
  width: 160px;
  height: 125px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #282828;
  border-radius: 6px;
  padding: 0;
`;

const DropDownItemContainer = styled.li`
  text-align: left;
  border-radius: 6px;
  max-width: 158px;
  max-height: 38px;
  padding: 8.8px 19px;
  list-style: none;
  cursor: pointer;
  background-color: #fafafa;
  color: #8d8d8d;
  &:hover {
    background-color: #f4f4f4;
    color: #282828;
  }
`;

// PropTypes 정의
DropDownItem.propTypes = {
  item: PropTypes.string.isRequired, // item은 문자열이어야 하며, 필수입니다.
  onClick: PropTypes.func.isRequired, // onClick은 함수이어야 하며, 필수입니다.
  selected: PropTypes.bool.isRequired, // selected는 불리언이어야 하며, 필수입니다.
  value: PropTypes.string.isRequired,
};

DropDown.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
