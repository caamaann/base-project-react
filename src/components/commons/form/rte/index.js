import React, { Component } from "react";
import PropTypes from "prop-types";

class RichTextMarkdown extends Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { value: undefined };
  }

  componentDidMount() {
    this.RichTextEditor = window.RichTextEditor;
    this.setState({
      value: this.props.input.value
        ? this.RichTextEditor.createValueFromString(
            this.props.input.value,
            "html"
          )
        : this.RichTextEditor.createEmptyValue(),
    });
  }

  handleChange = (value) => {
    this.setState({ value });
    let markdown = value.toString("html");
    if (
      markdown.length === 2 &&
      markdown.charCodeAt(0) === 8203 &&
      markdown.charCodeAt(1) === 10
    ) {
      markdown = "";
    }
    this.props.input.onChange(markdown);
  };

  render() {
    const {
      RichTextEditor,
      state: { value },
      handleChange,
    } = this;
    return RichTextEditor ? (
      <>
        <div>
          <RichTextEditor
            value={value}
            editorClassName="demo-editor"
            onChange={handleChange}
            placeholder={this.props.placeholder}
          />
          <div className="mb-1"></div>
          <span className="form-validation">
            {this.props.meta.touched && this.props.meta.error}
          </span>
          <div className="mb-1"></div>
        </div>
      </>
    ) : (
      <div />
    );
  }
}

export default RichTextMarkdown;
