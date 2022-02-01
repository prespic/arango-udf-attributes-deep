# arango-udf-attributes-deep
ArangoDB user function for deep attributes list


User defined function ATTRIBUTES_DEEP works similar to ATTRIBUTES, but its called recursively.
https://www.arangodb.com/docs/3.8/aql/functions-document.html#attributes
Missing boolean parameters for removeInternals and sort.

## EXAMPLE:

LET attributesPerDocument = (
    FOR doc IN @@col LIMIT 10 RETURN ATTRIBUTES_DEEP(doc, true)
)
FOR attributeArray IN attributesPerDocument
    FOR attribute IN attributeArray
        COLLECT attr = attribute WITH COUNT INTO count
        SORT count DESC, attr
        RETURN {attr, count}
