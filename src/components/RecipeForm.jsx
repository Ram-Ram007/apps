import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./RecipeForm.css"; // Import the CSS file

class RecipeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        title: "",
        imageUrl: "",
        steps: [{ id: uuidv4(), text: "" }],
      },
      recipes: [],
      submittedData: null,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleStepChange = (e, stepId) => {
    const { value } = e.target;
    this.setState((prevState) => {
      const newSteps = prevState.formData.steps.map((step) =>
        step.id === stepId ? { ...step, text: value } : step
      );
      return {
        formData: {
          ...prevState.formData,
          steps: newSteps,
        },
      };
    });
  };

  handleAddStep = () => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        steps: [...prevState.formData.steps, { id: uuidv4(), text: "" }],
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { ...this.state.formData, id: uuidv4() };
    this.setState((prevState) => ({
      recipes: [...prevState.recipes, newRecipe],
      submittedData: newRecipe,
      formData: {
        title: "",
        imageUrl: "",
        steps: [{ id: uuidv4(), text: "" }],
      },
    }));
  };

  render() {
    return (
      <div>
        <h2>Create a Recipe</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={this.state.formData.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={this.state.formData.imageUrl}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="steps">Steps:</label>
            {this.state.formData.steps.map((step, index) => (
              <div key={step.id}>
                <input
                  type="text"
                  value={step.text}
                  onChange={(e) => this.handleStepChange(e, step.id)}
                />
              </div>
            ))}
            <button
              type="button"
              className="add-step-button"
              onClick={this.handleAddStep}
            >
              Add Step
            </button>
          </div>
          <button type="submit">Submit</button>
        </form>

        <div>
          {this.state.recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h2>Recipe Cards</h2>
              <h3>{recipe.title}</h3>
              <p>Steps:</p>
              <ul>
                {recipe.steps.map((step) => (
                  <li key={step.id}>{step.text}</li>
                ))}
              </ul>
              <div>
                <img src={recipe.imageUrl} alt="Recipe" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RecipeForm;
