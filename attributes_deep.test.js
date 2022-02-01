/**
 * EXAMPLE:
 *
 * LET attributesPerDocument = (
 *     FOR doc IN @@col LIMIT 10 RETURN CMD::OBJECT::ATTRIBUTES_DEEP(doc, true)
 * )
 * FOR attributeArray IN attributesPerDocument
 *     FOR attribute IN attributeArray
 *         COLLECT attr = attribute WITH COUNT INTO count
 *         SORT count DESC, attr
 *         RETURN {attr, count}
 */


const {expect} = require('chai');
const fn = require('../../../../src/function/cmd/object/attributes_deep');

describe('attributes_deep', () => {

    const obj = {
        _id: 'collection/123',
        search: {
            contents: {
                foo: 'bar'
            },
            tags: ['a', 'b']
        },
    }

    it('return all attributes recursively', () => {
        expect(fn(obj)).to.eql([
            '$._id',
            '$.search',
            '$.search.contents',
            '$.search.contents.foo',
            '$.search.tags',
            '$.search.tags[*]',
        ]);
    });

});
