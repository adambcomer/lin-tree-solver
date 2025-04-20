/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import $protobuf from 'protobufjs/minimal'

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

export const Word = ($root.Word = (() => {
  /**
   * Properties of a Word.
   * @exports IWord
   * @interface IWord
   * @property {string|null} [text] Word text
   * @property {Array.<string>|null} [pos] Word pos
   */

  /**
   * Constructs a new Word.
   * @exports Word
   * @classdesc Represents a Word.
   * @implements IWord
   * @constructor
   * @param {IWord=} [properties] Properties to set
   */
  function Word(properties) {
    this.pos = []
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * Word text.
   * @member {string} text
   * @memberof Word
   * @instance
   */
  Word.prototype.text = ''

  /**
   * Word pos.
   * @member {Array.<string>} pos
   * @memberof Word
   * @instance
   */
  Word.prototype.pos = $util.emptyArray

  /**
   * Creates a new Word instance using the specified properties.
   * @function create
   * @memberof Word
   * @static
   * @param {IWord=} [properties] Properties to set
   * @returns {Word} Word instance
   */
  Word.create = function create(properties) {
    return new Word(properties)
  }

  /**
   * Encodes the specified Word message. Does not implicitly {@link Word.verify|verify} messages.
   * @function encode
   * @memberof Word
   * @static
   * @param {IWord} message Word message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Word.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    if (message.text != null && Object.hasOwnProperty.call(message, 'text'))
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.text)
    if (message.pos != null && message.pos.length)
      for (let i = 0; i < message.pos.length; ++i)
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.pos[i])
    return writer
  }

  /**
   * Encodes the specified Word message, length delimited. Does not implicitly {@link Word.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Word
   * @static
   * @param {IWord} message Word message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Word.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
   * Decodes a Word message from the specified reader or buffer.
   * @function decode
   * @memberof Word
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Word} Word
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Word.decode = function decode(reader, length, error) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Word()
    while (reader.pos < end) {
      let tag = reader.uint32()
      if (tag === error) break
      switch (tag >>> 3) {
        case 1: {
          message.text = reader.string()
          break
        }
        case 2: {
          if (!(message.pos && message.pos.length)) message.pos = []
          message.pos.push(reader.string())
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Decodes a Word message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Word
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Word} Word
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Word.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader)
    return this.decode(reader, reader.uint32())
  }

  /**
   * Verifies a Word message.
   * @function verify
   * @memberof Word
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Word.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected'
    if (message.text != null && message.hasOwnProperty('text'))
      if (!$util.isString(message.text)) return 'text: string expected'
    if (message.pos != null && message.hasOwnProperty('pos')) {
      if (!Array.isArray(message.pos)) return 'pos: array expected'
      for (let i = 0; i < message.pos.length; ++i)
        if (!$util.isString(message.pos[i])) return 'pos: string[] expected'
    }
    return null
  }

  /**
   * Creates a Word message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Word
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Word} Word
   */
  Word.fromObject = function fromObject(object) {
    if (object instanceof $root.Word) return object
    let message = new $root.Word()
    if (object.text != null) message.text = String(object.text)
    if (object.pos) {
      if (!Array.isArray(object.pos))
        throw TypeError('.Word.pos: array expected')
      message.pos = []
      for (let i = 0; i < object.pos.length; ++i)
        message.pos[i] = String(object.pos[i])
    }
    return message
  }

  /**
   * Creates a plain object from a Word message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Word
   * @static
   * @param {Word} message Word
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Word.toObject = function toObject(message, options) {
    if (!options) options = {}
    let object = {}
    if (options.arrays || options.defaults) object.pos = []
    if (options.defaults) object.text = ''
    if (message.text != null && message.hasOwnProperty('text'))
      object.text = message.text
    if (message.pos && message.pos.length) {
      object.pos = []
      for (let j = 0; j < message.pos.length; ++j)
        object.pos[j] = message.pos[j]
    }
    return object
  }

  /**
   * Converts this Word to JSON.
   * @function toJSON
   * @memberof Word
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Word.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the default type url for Word
   * @function getTypeUrl
   * @memberof Word
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  Word.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = 'type.googleapis.com'
    }
    return typeUrlPrefix + '/Word'
  }

  return Word
})())

export const Sentence = ($root.Sentence = (() => {
  /**
   * Properties of a Sentence.
   * @exports ISentence
   * @interface ISentence
   * @property {Array.<IWord>|null} [words] Sentence words
   */

  /**
   * Constructs a new Sentence.
   * @exports Sentence
   * @classdesc Represents a Sentence.
   * @implements ISentence
   * @constructor
   * @param {ISentence=} [properties] Properties to set
   */
  function Sentence(properties) {
    this.words = []
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * Sentence words.
   * @member {Array.<IWord>} words
   * @memberof Sentence
   * @instance
   */
  Sentence.prototype.words = $util.emptyArray

  /**
   * Creates a new Sentence instance using the specified properties.
   * @function create
   * @memberof Sentence
   * @static
   * @param {ISentence=} [properties] Properties to set
   * @returns {Sentence} Sentence instance
   */
  Sentence.create = function create(properties) {
    return new Sentence(properties)
  }

  /**
   * Encodes the specified Sentence message. Does not implicitly {@link Sentence.verify|verify} messages.
   * @function encode
   * @memberof Sentence
   * @static
   * @param {ISentence} message Sentence message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Sentence.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    if (message.words != null && message.words.length)
      for (let i = 0; i < message.words.length; ++i)
        $root.Word.encode(
          message.words[i],
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        ).ldelim()
    return writer
  }

  /**
   * Encodes the specified Sentence message, length delimited. Does not implicitly {@link Sentence.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Sentence
   * @static
   * @param {ISentence} message Sentence message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Sentence.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
   * Decodes a Sentence message from the specified reader or buffer.
   * @function decode
   * @memberof Sentence
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Sentence} Sentence
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Sentence.decode = function decode(reader, length, error) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Sentence()
    while (reader.pos < end) {
      let tag = reader.uint32()
      if (tag === error) break
      switch (tag >>> 3) {
        case 1: {
          if (!(message.words && message.words.length)) message.words = []
          message.words.push($root.Word.decode(reader, reader.uint32()))
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Decodes a Sentence message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Sentence
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Sentence} Sentence
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Sentence.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader)
    return this.decode(reader, reader.uint32())
  }

  /**
   * Verifies a Sentence message.
   * @function verify
   * @memberof Sentence
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Sentence.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected'
    if (message.words != null && message.hasOwnProperty('words')) {
      if (!Array.isArray(message.words)) return 'words: array expected'
      for (let i = 0; i < message.words.length; ++i) {
        let error = $root.Word.verify(message.words[i])
        if (error) return 'words.' + error
      }
    }
    return null
  }

  /**
   * Creates a Sentence message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Sentence
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Sentence} Sentence
   */
  Sentence.fromObject = function fromObject(object) {
    if (object instanceof $root.Sentence) return object
    let message = new $root.Sentence()
    if (object.words) {
      if (!Array.isArray(object.words))
        throw TypeError('.Sentence.words: array expected')
      message.words = []
      for (let i = 0; i < object.words.length; ++i) {
        if (typeof object.words[i] !== 'object')
          throw TypeError('.Sentence.words: object expected')
        message.words[i] = $root.Word.fromObject(object.words[i])
      }
    }
    return message
  }

  /**
   * Creates a plain object from a Sentence message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Sentence
   * @static
   * @param {Sentence} message Sentence
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Sentence.toObject = function toObject(message, options) {
    if (!options) options = {}
    let object = {}
    if (options.arrays || options.defaults) object.words = []
    if (message.words && message.words.length) {
      object.words = []
      for (let j = 0; j < message.words.length; ++j)
        object.words[j] = $root.Word.toObject(message.words[j], options)
    }
    return object
  }

  /**
   * Converts this Sentence to JSON.
   * @function toJSON
   * @memberof Sentence
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Sentence.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the default type url for Sentence
   * @function getTypeUrl
   * @memberof Sentence
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  Sentence.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = 'type.googleapis.com'
    }
    return typeUrlPrefix + '/Sentence'
  }

  return Sentence
})())

export const Tag = ($root.Tag = (() => {
  /**
   * Properties of a Tag.
   * @exports ITag
   * @interface ITag
   * @property {Array.<string>|null} [values] Tag values
   * @property {boolean|null} [optional] Tag optional
   * @property {boolean|null} [repeated] Tag repeated
   */

  /**
   * Constructs a new Tag.
   * @exports Tag
   * @classdesc Represents a Tag.
   * @implements ITag
   * @constructor
   * @param {ITag=} [properties] Properties to set
   */
  function Tag(properties) {
    this.values = []
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * Tag values.
   * @member {Array.<string>} values
   * @memberof Tag
   * @instance
   */
  Tag.prototype.values = $util.emptyArray

  /**
   * Tag optional.
   * @member {boolean} optional
   * @memberof Tag
   * @instance
   */
  Tag.prototype.optional = false

  /**
   * Tag repeated.
   * @member {boolean} repeated
   * @memberof Tag
   * @instance
   */
  Tag.prototype.repeated = false

  /**
   * Creates a new Tag instance using the specified properties.
   * @function create
   * @memberof Tag
   * @static
   * @param {ITag=} [properties] Properties to set
   * @returns {Tag} Tag instance
   */
  Tag.create = function create(properties) {
    return new Tag(properties)
  }

  /**
   * Encodes the specified Tag message. Does not implicitly {@link Tag.verify|verify} messages.
   * @function encode
   * @memberof Tag
   * @static
   * @param {ITag} message Tag message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Tag.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    if (message.values != null && message.values.length)
      for (let i = 0; i < message.values.length; ++i)
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.values[i])
    if (
      message.optional != null &&
      Object.hasOwnProperty.call(message, 'optional')
    )
      writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.optional)
    if (
      message.repeated != null &&
      Object.hasOwnProperty.call(message, 'repeated')
    )
      writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.repeated)
    return writer
  }

  /**
   * Encodes the specified Tag message, length delimited. Does not implicitly {@link Tag.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Tag
   * @static
   * @param {ITag} message Tag message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Tag.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
   * Decodes a Tag message from the specified reader or buffer.
   * @function decode
   * @memberof Tag
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Tag} Tag
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Tag.decode = function decode(reader, length, error) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Tag()
    while (reader.pos < end) {
      let tag = reader.uint32()
      if (tag === error) break
      switch (tag >>> 3) {
        case 1: {
          if (!(message.values && message.values.length)) message.values = []
          message.values.push(reader.string())
          break
        }
        case 2: {
          message.optional = reader.bool()
          break
        }
        case 3: {
          message.repeated = reader.bool()
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Decodes a Tag message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Tag
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Tag} Tag
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Tag.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader)
    return this.decode(reader, reader.uint32())
  }

  /**
   * Verifies a Tag message.
   * @function verify
   * @memberof Tag
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Tag.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected'
    if (message.values != null && message.hasOwnProperty('values')) {
      if (!Array.isArray(message.values)) return 'values: array expected'
      for (let i = 0; i < message.values.length; ++i)
        if (!$util.isString(message.values[i]))
          return 'values: string[] expected'
    }
    if (message.optional != null && message.hasOwnProperty('optional'))
      if (typeof message.optional !== 'boolean')
        return 'optional: boolean expected'
    if (message.repeated != null && message.hasOwnProperty('repeated'))
      if (typeof message.repeated !== 'boolean')
        return 'repeated: boolean expected'
    return null
  }

  /**
   * Creates a Tag message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Tag
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Tag} Tag
   */
  Tag.fromObject = function fromObject(object) {
    if (object instanceof $root.Tag) return object
    let message = new $root.Tag()
    if (object.values) {
      if (!Array.isArray(object.values))
        throw TypeError('.Tag.values: array expected')
      message.values = []
      for (let i = 0; i < object.values.length; ++i)
        message.values[i] = String(object.values[i])
    }
    if (object.optional != null) message.optional = Boolean(object.optional)
    if (object.repeated != null) message.repeated = Boolean(object.repeated)
    return message
  }

  /**
   * Creates a plain object from a Tag message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Tag
   * @static
   * @param {Tag} message Tag
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Tag.toObject = function toObject(message, options) {
    if (!options) options = {}
    let object = {}
    if (options.arrays || options.defaults) object.values = []
    if (options.defaults) {
      object.optional = false
      object.repeated = false
    }
    if (message.values && message.values.length) {
      object.values = []
      for (let j = 0; j < message.values.length; ++j)
        object.values[j] = message.values[j]
    }
    if (message.optional != null && message.hasOwnProperty('optional'))
      object.optional = message.optional
    if (message.repeated != null && message.hasOwnProperty('repeated'))
      object.repeated = message.repeated
    return object
  }

  /**
   * Converts this Tag to JSON.
   * @function toJSON
   * @memberof Tag
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Tag.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the default type url for Tag
   * @function getTypeUrl
   * @memberof Tag
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  Tag.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = 'type.googleapis.com'
    }
    return typeUrlPrefix + '/Tag'
  }

  return Tag
})())

export const Rule = ($root.Rule = (() => {
  /**
   * Properties of a Rule.
   * @exports IRule
   * @interface IRule
   * @property {string|null} [name] Rule name
   * @property {Array.<ITag>|null} [tags] Rule tags
   */

  /**
   * Constructs a new Rule.
   * @exports Rule
   * @classdesc Represents a Rule.
   * @implements IRule
   * @constructor
   * @param {IRule=} [properties] Properties to set
   */
  function Rule(properties) {
    this.tags = []
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * Rule name.
   * @member {string} name
   * @memberof Rule
   * @instance
   */
  Rule.prototype.name = ''

  /**
   * Rule tags.
   * @member {Array.<ITag>} tags
   * @memberof Rule
   * @instance
   */
  Rule.prototype.tags = $util.emptyArray

  /**
   * Creates a new Rule instance using the specified properties.
   * @function create
   * @memberof Rule
   * @static
   * @param {IRule=} [properties] Properties to set
   * @returns {Rule} Rule instance
   */
  Rule.create = function create(properties) {
    return new Rule(properties)
  }

  /**
   * Encodes the specified Rule message. Does not implicitly {@link Rule.verify|verify} messages.
   * @function encode
   * @memberof Rule
   * @static
   * @param {IRule} message Rule message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Rule.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    if (message.name != null && Object.hasOwnProperty.call(message, 'name'))
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name)
    if (message.tags != null && message.tags.length)
      for (let i = 0; i < message.tags.length; ++i)
        $root.Tag.encode(
          message.tags[i],
          writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
        ).ldelim()
    return writer
  }

  /**
   * Encodes the specified Rule message, length delimited. Does not implicitly {@link Rule.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Rule
   * @static
   * @param {IRule} message Rule message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Rule.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
   * Decodes a Rule message from the specified reader or buffer.
   * @function decode
   * @memberof Rule
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Rule} Rule
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Rule.decode = function decode(reader, length, error) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Rule()
    while (reader.pos < end) {
      let tag = reader.uint32()
      if (tag === error) break
      switch (tag >>> 3) {
        case 1: {
          message.name = reader.string()
          break
        }
        case 2: {
          if (!(message.tags && message.tags.length)) message.tags = []
          message.tags.push($root.Tag.decode(reader, reader.uint32()))
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Decodes a Rule message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Rule
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Rule} Rule
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Rule.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader)
    return this.decode(reader, reader.uint32())
  }

  /**
   * Verifies a Rule message.
   * @function verify
   * @memberof Rule
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Rule.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected'
    if (message.name != null && message.hasOwnProperty('name'))
      if (!$util.isString(message.name)) return 'name: string expected'
    if (message.tags != null && message.hasOwnProperty('tags')) {
      if (!Array.isArray(message.tags)) return 'tags: array expected'
      for (let i = 0; i < message.tags.length; ++i) {
        let error = $root.Tag.verify(message.tags[i])
        if (error) return 'tags.' + error
      }
    }
    return null
  }

  /**
   * Creates a Rule message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Rule
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Rule} Rule
   */
  Rule.fromObject = function fromObject(object) {
    if (object instanceof $root.Rule) return object
    let message = new $root.Rule()
    if (object.name != null) message.name = String(object.name)
    if (object.tags) {
      if (!Array.isArray(object.tags))
        throw TypeError('.Rule.tags: array expected')
      message.tags = []
      for (let i = 0; i < object.tags.length; ++i) {
        if (typeof object.tags[i] !== 'object')
          throw TypeError('.Rule.tags: object expected')
        message.tags[i] = $root.Tag.fromObject(object.tags[i])
      }
    }
    return message
  }

  /**
   * Creates a plain object from a Rule message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Rule
   * @static
   * @param {Rule} message Rule
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Rule.toObject = function toObject(message, options) {
    if (!options) options = {}
    let object = {}
    if (options.arrays || options.defaults) object.tags = []
    if (options.defaults) object.name = ''
    if (message.name != null && message.hasOwnProperty('name'))
      object.name = message.name
    if (message.tags && message.tags.length) {
      object.tags = []
      for (let j = 0; j < message.tags.length; ++j)
        object.tags[j] = $root.Tag.toObject(message.tags[j], options)
    }
    return object
  }

  /**
   * Converts this Rule to JSON.
   * @function toJSON
   * @memberof Rule
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Rule.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the default type url for Rule
   * @function getTypeUrl
   * @memberof Rule
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  Rule.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = 'type.googleapis.com'
    }
    return typeUrlPrefix + '/Rule'
  }

  return Rule
})())

export const RuleSet = ($root.RuleSet = (() => {
  /**
   * Properties of a RuleSet.
   * @exports IRuleSet
   * @interface IRuleSet
   * @property {Array.<string>|null} [roots] RuleSet roots
   * @property {Array.<string>|null} [pos] RuleSet pos
   * @property {Array.<IRule>|null} [rules] RuleSet rules
   */

  /**
   * Constructs a new RuleSet.
   * @exports RuleSet
   * @classdesc Represents a RuleSet.
   * @implements IRuleSet
   * @constructor
   * @param {IRuleSet=} [properties] Properties to set
   */
  function RuleSet(properties) {
    this.roots = []
    this.pos = []
    this.rules = []
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * RuleSet roots.
   * @member {Array.<string>} roots
   * @memberof RuleSet
   * @instance
   */
  RuleSet.prototype.roots = $util.emptyArray

  /**
   * RuleSet pos.
   * @member {Array.<string>} pos
   * @memberof RuleSet
   * @instance
   */
  RuleSet.prototype.pos = $util.emptyArray

  /**
   * RuleSet rules.
   * @member {Array.<IRule>} rules
   * @memberof RuleSet
   * @instance
   */
  RuleSet.prototype.rules = $util.emptyArray

  /**
   * Creates a new RuleSet instance using the specified properties.
   * @function create
   * @memberof RuleSet
   * @static
   * @param {IRuleSet=} [properties] Properties to set
   * @returns {RuleSet} RuleSet instance
   */
  RuleSet.create = function create(properties) {
    return new RuleSet(properties)
  }

  /**
   * Encodes the specified RuleSet message. Does not implicitly {@link RuleSet.verify|verify} messages.
   * @function encode
   * @memberof RuleSet
   * @static
   * @param {IRuleSet} message RuleSet message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  RuleSet.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    if (message.roots != null && message.roots.length)
      for (let i = 0; i < message.roots.length; ++i)
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.roots[i])
    if (message.pos != null && message.pos.length)
      for (let i = 0; i < message.pos.length; ++i)
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.pos[i])
    if (message.rules != null && message.rules.length)
      for (let i = 0; i < message.rules.length; ++i)
        $root.Rule.encode(
          message.rules[i],
          writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
        ).ldelim()
    return writer
  }

  /**
   * Encodes the specified RuleSet message, length delimited. Does not implicitly {@link RuleSet.verify|verify} messages.
   * @function encodeDelimited
   * @memberof RuleSet
   * @static
   * @param {IRuleSet} message RuleSet message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  RuleSet.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
   * Decodes a RuleSet message from the specified reader or buffer.
   * @function decode
   * @memberof RuleSet
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {RuleSet} RuleSet
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  RuleSet.decode = function decode(reader, length, error) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.RuleSet()
    while (reader.pos < end) {
      let tag = reader.uint32()
      if (tag === error) break
      switch (tag >>> 3) {
        case 1: {
          if (!(message.roots && message.roots.length)) message.roots = []
          message.roots.push(reader.string())
          break
        }
        case 2: {
          if (!(message.pos && message.pos.length)) message.pos = []
          message.pos.push(reader.string())
          break
        }
        case 3: {
          if (!(message.rules && message.rules.length)) message.rules = []
          message.rules.push($root.Rule.decode(reader, reader.uint32()))
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Decodes a RuleSet message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof RuleSet
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {RuleSet} RuleSet
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  RuleSet.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader)
    return this.decode(reader, reader.uint32())
  }

  /**
   * Verifies a RuleSet message.
   * @function verify
   * @memberof RuleSet
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  RuleSet.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected'
    if (message.roots != null && message.hasOwnProperty('roots')) {
      if (!Array.isArray(message.roots)) return 'roots: array expected'
      for (let i = 0; i < message.roots.length; ++i)
        if (!$util.isString(message.roots[i])) return 'roots: string[] expected'
    }
    if (message.pos != null && message.hasOwnProperty('pos')) {
      if (!Array.isArray(message.pos)) return 'pos: array expected'
      for (let i = 0; i < message.pos.length; ++i)
        if (!$util.isString(message.pos[i])) return 'pos: string[] expected'
    }
    if (message.rules != null && message.hasOwnProperty('rules')) {
      if (!Array.isArray(message.rules)) return 'rules: array expected'
      for (let i = 0; i < message.rules.length; ++i) {
        let error = $root.Rule.verify(message.rules[i])
        if (error) return 'rules.' + error
      }
    }
    return null
  }

  /**
   * Creates a RuleSet message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof RuleSet
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {RuleSet} RuleSet
   */
  RuleSet.fromObject = function fromObject(object) {
    if (object instanceof $root.RuleSet) return object
    let message = new $root.RuleSet()
    if (object.roots) {
      if (!Array.isArray(object.roots))
        throw TypeError('.RuleSet.roots: array expected')
      message.roots = []
      for (let i = 0; i < object.roots.length; ++i)
        message.roots[i] = String(object.roots[i])
    }
    if (object.pos) {
      if (!Array.isArray(object.pos))
        throw TypeError('.RuleSet.pos: array expected')
      message.pos = []
      for (let i = 0; i < object.pos.length; ++i)
        message.pos[i] = String(object.pos[i])
    }
    if (object.rules) {
      if (!Array.isArray(object.rules))
        throw TypeError('.RuleSet.rules: array expected')
      message.rules = []
      for (let i = 0; i < object.rules.length; ++i) {
        if (typeof object.rules[i] !== 'object')
          throw TypeError('.RuleSet.rules: object expected')
        message.rules[i] = $root.Rule.fromObject(object.rules[i])
      }
    }
    return message
  }

  /**
   * Creates a plain object from a RuleSet message. Also converts values to other types if specified.
   * @function toObject
   * @memberof RuleSet
   * @static
   * @param {RuleSet} message RuleSet
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  RuleSet.toObject = function toObject(message, options) {
    if (!options) options = {}
    let object = {}
    if (options.arrays || options.defaults) {
      object.roots = []
      object.pos = []
      object.rules = []
    }
    if (message.roots && message.roots.length) {
      object.roots = []
      for (let j = 0; j < message.roots.length; ++j)
        object.roots[j] = message.roots[j]
    }
    if (message.pos && message.pos.length) {
      object.pos = []
      for (let j = 0; j < message.pos.length; ++j)
        object.pos[j] = message.pos[j]
    }
    if (message.rules && message.rules.length) {
      object.rules = []
      for (let j = 0; j < message.rules.length; ++j)
        object.rules[j] = $root.Rule.toObject(message.rules[j], options)
    }
    return object
  }

  /**
   * Converts this RuleSet to JSON.
   * @function toJSON
   * @memberof RuleSet
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  RuleSet.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the default type url for RuleSet
   * @function getTypeUrl
   * @memberof RuleSet
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  RuleSet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = 'type.googleapis.com'
    }
    return typeUrlPrefix + '/RuleSet'
  }

  return RuleSet
})())

export { $root as default }
