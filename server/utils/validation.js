export function mandatory(param) {
  throw new Meteor.Error(param, 'Missing parameter');
}

export function optional(param) {
  if (param === 'options') {
    return null;
  }
}
