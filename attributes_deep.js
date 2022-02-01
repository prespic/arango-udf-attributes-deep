'use strict'




const attributes_deep = function (value) {


    function join(parentsKeyPath, key) {
        return parentsKeyPath + '.' + key;
    }


    function isObject(obj) {
        return obj != null && obj.constructor.name === "Object"
    }

    function _attributes_deep (value, parentsKeyPath) {
        const result = [];
        const keys = Object.keys(value || {});
        for (const key of keys) {
            const prop = value[key];
            let propPath = join(parentsKeyPath, key);
            // push the key itself
            result.push(propPath);
            // if its array, push with modifier
            if (Array.isArray(prop)) {
                result.push(propPath + '[*]')
            }
            // and if its object, push recursive keys
            else if (isObject(prop)) {
                result.push(..._attributes_deep(prop, propPath));
            }
        }
        return result;
    }


    return _attributes_deep(value, '$');
}

module.exports = attributes_deep;
