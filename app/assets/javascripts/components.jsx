//= require_tree ./components

// THIS COMPONENT RENDERS RadioOptionGroup. IT IS THE MOST OUT SHELL OF ALL TEMPLATES
var Demo = React.createClass({
  render: function() {

    var radioOptions = [
    { value: 'newspaper', label: "Newspaper"},
    { value: 'radio', label: "Radio"},
    { value: 'tv', label: "TV"},
    { value: 'search', label: "Search Engine"},
    { value: 'social', label: "Social Media"}
    ];

    return (
      <div>
        <h1>How did you hear about us?</h1>

        <form>
          <RadioOptionGroup other={true} options={radioOptions} />
        </form>

      </div>
      );
  }
});

// THIS COMPONENT LISTS EACH RADIO OPTION
var RadioOptionGroup = React.createClass({
  onChange: function(event) {
    if (this.props.other) {
      this.refs.other.forceUpdate();
    }
  },

  render: function() {
    return(
      <div onChange={this.onChange}>
        {/* In the RadioOptionsGroup *tag*, "options" is defined as the variable "radioOptions" */}
        {/* Therefore it is *passing* the array variable into the "options" props */}
        {/* Therefore, .map will loop through the array radioOptions */}
        {/* .map means: Create a new array by feeding an existing array into a function */}
        {/* In this case, we are rendering the modified array rather than creating a new one. */}
        {this.props.options.map(function(option){
          return (
            <RadioOption value={option.value}>
              {option.label}
            </RadioOption>
            )
        })}

        {/* Render the tag if this.props.other is true */}
        {/* How come the other radio HTML tags do not show the "other" version, but this one does? Because this is the only part of the RadioOptionGroup component that calls this.props.other AND calls the RadioOtherOption component. */}
        {this.props.other && <RadioOtherOption ref="other" />}
      </div>
      )
  }
})

// THIS COMPONENT IS THE TEMPLATE FOR ONE RADIO OPTION
var RadioOption = React.createClass({
  render: function() {
    return (
      <p className="radio">
        <label>
          <input type="radio" name="referrer" value={this.props.value} />
          {this.props.children}
        </label>
      </p>
      )
  }
});

// THIS COMPONENT IS THE TEMPLATE FOR THE "OTHER" OPTION
var RadioOtherOption = React.createClass({
  getInitialState: function() {
    return {
      checked: false
    };
  },

  onChange: function(event) {
    var input = event.target;

    this.setState({
      checked: input.checked
    });
  },

  componentDidUpdate: function(prevProps, prevState) {
    var input = this.refs.input.getDOMNode();

    if (prevState.checked != input.checked) {
      this.setState({
        checked: input.checked});          
    }
  },

  render: function() {
    return(
      <p>
        <label>
          {/* When the value changes (onChange), call the function named "onChange" */}
          <input onChange={this.onChange} type="radio" name="referrer" value="other" ref="input" />
          Other
        </label>
        {this.state.checked && (
            <label>
              &nbsp;- Please specify:
              <input type="text" name="referrer_other" />
            </label>
          )}
      </p>
      )
  }
});
