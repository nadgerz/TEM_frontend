import React from 'react';

import { CookingTimeIcon, ServingSizeIcon } from '../assets/SVG/svg';
import '../assets/CSS/pages/Recipe.scss';

import mockImage from '../assets/imgs/iu-1.jpeg';

const Recipe = () => {
  const titles = {
    directions: 'Directions',
    ingredients: 'Ingredients',
    notes: 'Notes',
  };

  return (
    <div id={'recipe'} className={'recipe'}>
      {/*  T O P    */}
      <div className={'top'}>
        <div className="left">
          <div>
            <h3>A Recipe Name on the Recipe page</h3>
            <div className="icons">
              <div className="cooking-time icon-with-text">
                <CookingTimeIcon />
                <h6>
                  <span>{25}</span> min
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="img">
            <img src={mockImage} alt="" />
          </div>
        </div>
      </div>

      {/*  B O T T O M  */}
      <div className="bottom version">
        <div className="left">
          <div className="directions">
            <h4>{titles.directions}</h4>

            <div className="content">
              <ul>
                <li className={'direction'}>mimimimimimi</li>
              </ul>
            </div>
          </div>

          <div className="notes">
            <h4>{titles.notes}</h4>
            <div className="content">
              <p>Some Text</p>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="ingredients">
            <h4>{titles.ingredients}</h4>

            <div className="icons">
              <div className="serving-size icon-with-text">
                <ServingSizeIcon />
                <h6>
                  <span>{4}</span> Servings
                </h6>
              </div>
            </div>

            <div className="content">
              <ul>
                <li>
                  <input type="radio" name="ingredient" id={'ingredient' + 1} />
                  mimimimimimi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;