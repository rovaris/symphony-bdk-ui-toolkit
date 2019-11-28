import uuid from 'uuid';

// Recursively label each renderable object with a uuid
export const labelize = (obj) => {
  if (!obj) {
    return null;
  }
  if (Array.isArray(obj)) {
    return obj.map(l => labelize(l));
  }
  if (obj.options) {
    return {
      ...obj,
      uid: uuid.v4(),
      options: obj.options.map(l => labelize(l)),
    };
  }
  if (obj.suboptions) {
    return {
      ...obj,
      uid: uuid.v4(),
      suboptions: obj.suboptions.map(l => labelize(l)),
    };
  }
  return { ...obj, uid: uuid.v4() };
};

const filteringFunction = (obj, filterQuery) => {
  if (!filterQuery) {
    return true;
  }
  if (obj.label.toLowerCase().includes(filterQuery)) {
    return true;
  } if (obj.sublabel) {
    return obj.sublabel.toLowerCase().includes(filterQuery);
  }
  return false;
};

export const buildSelectableArray = (obj, filterQuery = '') => {
  if (!obj || !obj.length) {
    return [];
  }
  return obj.reduce((acc, el) => {
    if (el.suboptions) {
      return [...acc, ...el.suboptions.filter(x => filteringFunction(x, filterQuery))];
    }
    if (filteringFunction(el, filterQuery)) {
      return [...acc, el];
    }
    return acc;
  }, []);
};

export const getItemFromUid = (content, uid) => {
  for (let i = 0; i < content.length; i++) {
    if (content[i].suboptions) {
      for (let j = 0; j < content[i].suboptions.length; j++) {
        if (content[i].suboptions[j].uid === uid) {
          return content[i].suboptions[j];
        }
      }
    } else if (content[i].uid === uid) {
      return content[i];
    }
  }
  return null;
};
