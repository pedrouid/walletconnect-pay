import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "./Icon";
import { apiPinFile } from "../helpers/api";
import uploadIcon from "../assets/upload.svg";
import { colors, transitions } from "../styles";
import { SLabel } from "./common";

const SUploadWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface IIconWrapperStyleProps {
  color: string;
  size: number;
}

const SUploadButton = styled.button<IIconWrapperStyleProps>`
  position: relative;
  border: none;
  border-style: none;
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  will-change: transform;
  transition: ${transitions.button};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size * (2 / 3)}px`};
  margin-top: 8px;
  border: ${({ color }) => `2px dotted rgb(${colors[color]})`};
  @media (hover: hover) {
    &:hover {
      transform: ${({ disabled }) => (!disabled ? "translateY(-1px)" : "none")};
    }
  }
`;

class Upload extends React.Component<any, any> {
  public static propTypes = {
    onUpload: PropTypes.func.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    label: PropTypes.string
  };

  public static defaultProps = {
    color: "grey",
    size: 200,
    label: "Upload Image"
  };

  public inputRef: React.RefObject<HTMLInputElement>;

  set input(value: any) {
    return;
  }

  get input() {
    const _input: HTMLInputElement | null =
      this.inputRef && this.inputRef.current ? this.inputRef.current : null;
    return _input;
  }

  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
  }

  public onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      const files = Array.from(event.target.files);

      this.setState({ uploading: true });

      const formData = new FormData();

      files.forEach((file: File, index: number) => {
        formData.append(`${index}`, file);
      });

      const ipfsHash = await apiPinFile(formData);

      console.log("[onUpload] ipfsHash", ipfsHash); // tslint:disable-line

      this.props.onUpload(ipfsHash);
    }
  };

  public onClick = () => {
    if (this.input) {
      this.input.click();
    }
  };

  public render() {
    const { color, size, label } = this.props;
    return (
      <SUploadWrapper>
        <SLabel>{label}</SLabel>
        <SUploadButton size={size} color={color} onClick={this.onClick}>
          <Icon size={size / 4} icon={uploadIcon} color={color} />
          <input
            ref={this.inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={this.onUpload}
          />
        </SUploadButton>
      </SUploadWrapper>
    );
  }
}

export default Upload;
