import styled from "styled-components";
import { colors, fonts, transitions } from "../../styles";

export const SListItemImage = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & img {
    width: 100%;
  }
`;

export const SListItemText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SListItemName = styled.div`
  font-size: ${fonts.size.large};
`;

export const SListItemDescription = styled.div`
  color: rgb(${colors.grey});
  margin-top: 8px;
`;

export const SColumnWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
`;

interface IColumnStyleProps {
  width: number;
}

export const SColumn = styled.div<IColumnStyleProps>`
  transition: ${transitions.long};
  width: ${({ width }) => `${width}%`};
  border-right: 1px solid rgb(${colors.lightGrey});
  height: 100%;
  max-height: 100vh;

  &:last-child {
    border-right: none;
  }
`;

export const SColumnOrder = styled(SColumn)`
  display: flex;
  flex-direction: column;
`;

export const SColumnHeader = styled.div`
  border-bottom: 1px solid rgb(${colors.lightGrey});
  background: rgb(${colors.white});
  padding: 20px;
`;

export const SColumnFooter = styled.div`
  border-top: 1px solid rgb(${colors.lightGrey});
  background: rgb(${colors.white});
  padding: 20px;
`;

interface IColumnListStyleProps {
  column?: boolean;
  wrap?: boolean;
}

export const SColumnList = styled.div<IColumnListStyleProps>`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  background: rgb(${colors.white});
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 8%;
`;

export const SColumnRowTitle = styled.div`
  font-size: ${fonts.size.large};
  color: rgb(${colors.dark});
`;

export const SColumnRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgb(${colors.grey});
  margin-top: 8px;
  &:first-child {
    margin-top: 0;
  }
`;

export const STitle = styled.h4`
  margin: 0;
`;

interface IGridStyleProps {
  itemMaxWidth?: number;
  itemMaxHeight?: number;
  gap?: number;
  columnGap?: number;
  rowGap?: number;
}

export const SGrid = styled.div<IGridStyleProps>`
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow-x: hidden;
  overflow-y: scroll;
  background: rgb(${colors.white});

  display: grid;
  grid-template-columns: ${({ itemMaxWidth }) =>
    itemMaxWidth ? `repeat(auto-fit, minmax(${itemMaxWidth}px, 1fr))` : `1fr`};
  grid-template-rows: ${({ itemMaxHeight }) =>
    itemMaxHeight ? `repeat(auto-fit, ${itemMaxHeight}px)` : `1fr`};
  grid-column-gap: ${({ columnGap, gap }) =>
    columnGap ? `${columnGap}px` : gap ? `${gap}px` : `inherit`};
  grid-row-gap: ${({ rowGap, gap }) =>
    rowGap ? `${rowGap}px` : gap ? `${gap}px` : `inherit`};
`;

export const SLabel = styled.label`
  color: rgb(${colors.grey});
  font-size: ${fonts.size.small};
  font-weight: ${fonts.weight.semibold};
  width: 100%;
  margin-top: 16px;

  & ~ input,
  & ~ div {
    margin-top: 8px;
  }
`;

export const SField = styled.p`
  width: 100%;
  font-weight: 600;
  line-height: 1.2;
`;
