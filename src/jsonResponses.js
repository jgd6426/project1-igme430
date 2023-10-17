const recipes = {};

// function to respond with a json object
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// get user object
const getRecipes = (request, response) => {
  const responseJSON = {
    recipes,
  };
  // return 200 with message
  return respondJSON(request, response, 200, responseJSON.recipes);
};

// get meta info about user object
const getRecipesMeta = (request, response) => respondJSONMeta(request, response, 200);

// function to add a user from a POST body
const addRecipe = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'All inputs are required.',
  };

  // check to make sure we have all fields
  if (!body.name || !body.ingredients || !body.directions) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code to 204 updated
  let responseCode = 204;

  // If the user doesn't exist yet
  if (!recipes[body.name]) {
    // set the status code to 201 (created) and create an empty user
    responseCode = 201;
    recipes[body.name] = {};
  }

  // add or update fields for this user name
  recipes[body.name].name = body.name;
  recipes[body.name].ingredients = body.ingredients;
  recipes[body.name].directions = body.directions;

  // if response is created, then set our created message
  // and send response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

// set public modules
module.exports = {
  addRecipe,
  getRecipes,
  getRecipesMeta,
  notFound,
  notFoundMeta,
};
