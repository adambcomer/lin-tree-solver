/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from 'protobufjs/minimal.js'

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util
const $Object = $util.global.Object,
  $undefined = $util.global.undefined,
  $Error = $util.global.Error,
  $Array = $util.global.Array,
  $TypeError = $util.global.TypeError,
  $String = $util.global.String,
  $Boolean = $util.global.Boolean

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

export const Word = ($root.Word = (() => {
  /**
   * Properties of a Word.
   * @typedef {Object} Word.$Properties
   * @property {string|null} [text] Word text
   * @property {Array.<string>|null} [pos] Word pos
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */

  /**
   * Properties of a Word.
   * @exports IWord
   * @interface IWord
   * @augments Word.$Properties
   * @deprecated Use Word.$Properties instead.
   */

  /**
   * Shape of a Word.
   * @typedef {Word.$Properties} Word.$Shape
   */

  /**
   * Constructs a new Word.
   * @exports Word
   * @classdesc Represents a Word.
   * @constructor
   * @param {Word.$Properties=} [properties] Properties to set
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */
  const Word = function (properties) {
    this.pos = []
    if (properties)
      for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null && keys[i] !== '__proto__')
          this[keys[i]] = properties[keys[i]]
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
   * @param {Word.$Properties=} [properties] Properties to set
   * @returns {Word} Word instance
   * @type {{
   *   (properties: Word.$Shape): Word & Word.$Shape;
   *   (properties?: Word.$Properties): Word;
   * }}
   */
  Word.create = function (properties) {
    return new Word(properties)
  }

  /**
   * Encodes the specified Word message. Does not implicitly {@link Word.verify|verify} messages.
   * @function encode
   * @memberof Word
   * @static
   * @param {Word.$Properties} message Word message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Word.encode = function (message, writer, _depth) {
    if (!writer) writer = $Writer.create()
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    if (message.text != null && $Object.hasOwnProperty.call(message, 'text'))
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.text)
    if (message.pos != null && message.pos.length)
      for (let i = 0; i < message.pos.length; ++i)
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.pos[i])
    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, '$unknowns'))
      for (let i = 0; i < message.$unknowns.length; ++i) writer.raw(message.$unknowns[i])
    return writer
  }

  /**
   * Encodes the specified Word message, length delimited. Does not implicitly {@link Word.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Word
   * @static
   * @param {Word.$Properties} message Word message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Word.encodeDelimited = function (message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim()
  }

  /**
   * Decodes a Word message from the specified reader or buffer.
   * @function decode
   * @memberof Word
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Word & Word.$Shape} Word
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Word.decode = function (reader, length, _end, _depth, _target) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    if (_depth === $undefined) _depth = 0
    if (_depth > $Reader.recursionLimit) throw $Error('max depth exceeded')
    let end = length === $undefined ? reader.len : reader.pos + length,
      message = _target || new $root.Word(),
      value
    while (reader.pos < end) {
      let start = reader.pos
      let tag = reader.tag()
      if (tag === _end) {
        _end = $undefined
        break
      }
      let wireType = tag & 7
      switch ((tag >>>= 3)) {
        case 1: {
          if (wireType !== 2) break
          if ((value = reader.stringVerify()).length) message.text = value
          else delete message.text
          continue
        }
        case 2: {
          if (wireType !== 2) break
          if (!(message.pos && message.pos.length)) message.pos = []
          message.pos.push(reader.stringVerify())
          continue
        }
      }
      reader.skipType(wireType, _depth, tag)
      if (!reader.discardUnknown) {
        $util.makeProp(message, '$unknowns', false)
        ;(message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos))
      }
    }
    if (_end !== $undefined) throw $Error('missing end group')
    return message
  }

  /**
   * Decodes a Word message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Word
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Word & Word.$Shape} Word
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Word.decodeDelimited = function (reader) {
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
  Word.verify = function (message, _depth) {
    if (typeof message !== 'object' || message === null) return 'object expected'
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) return 'max depth exceeded'
    if (message.text != null && $Object.hasOwnProperty.call(message, 'text'))
      if (!$util.isString(message.text)) return 'text: string expected'
    if (message.pos != null && $Object.hasOwnProperty.call(message, 'pos')) {
      if (!$Array.isArray(message.pos)) return 'pos: array expected'
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
  Word.fromObject = function (object, _depth) {
    if (object instanceof $root.Word) return object
    if (!$util.isObject(object)) throw $TypeError('.Word: object expected')
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let message = new $root.Word()
    if (object.text != null)
      if (typeof object.text !== 'string' || object.text.length) message.text = $String(object.text)
    if (object.pos) {
      if (!$Array.isArray(object.pos)) throw $TypeError('.Word.pos: array expected')
      message.pos = $Array(object.pos.length)
      for (let i = 0; i < object.pos.length; ++i) message.pos[i] = $String(object.pos[i])
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
  Word.toObject = function (message, options, _depth) {
    if (!options) options = {}
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let object = {}
    if (options.arrays || options.defaults) object.pos = []
    if (options.defaults) object.text = ''
    if (message.text != null && $Object.hasOwnProperty.call(message, 'text'))
      object.text = message.text
    if (message.pos && message.pos.length) {
      object.pos = $Array(message.pos.length)
      for (let j = 0; j < message.pos.length; ++j) object.pos[j] = message.pos[j]
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
  Word.prototype.toJSON = function () {
    return Word.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the type url for Word
   * @function getTypeUrl
   * @memberof Word
   * @static
   * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns {string} The type url
   */
  Word.getTypeUrl = function (prefix) {
    if (prefix === $undefined) prefix = 'type.googleapis.com'
    return prefix + '/Word'
  }

  return Word
})())

export const Sentence = ($root.Sentence = (() => {
  /**
   * Properties of a Sentence.
   * @typedef {Object} Sentence.$Properties
   * @property {Array.<Word.$Properties>|null} [words] Sentence words
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */

  /**
   * Properties of a Sentence.
   * @exports ISentence
   * @interface ISentence
   * @augments Sentence.$Properties
   * @deprecated Use Sentence.$Properties instead.
   */

  /**
   * Shape of a Sentence.
   * @typedef {Sentence.$Properties} Sentence.$Shape
   */

  /**
   * Constructs a new Sentence.
   * @exports Sentence
   * @classdesc Represents a Sentence.
   * @constructor
   * @param {Sentence.$Properties=} [properties] Properties to set
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */
  const Sentence = function (properties) {
    this.words = []
    if (properties)
      for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null && keys[i] !== '__proto__')
          this[keys[i]] = properties[keys[i]]
  }

  /**
   * Sentence words.
   * @member {Array.<Word.$Properties>} words
   * @memberof Sentence
   * @instance
   */
  Sentence.prototype.words = $util.emptyArray

  /**
   * Creates a new Sentence instance using the specified properties.
   * @function create
   * @memberof Sentence
   * @static
   * @param {Sentence.$Properties=} [properties] Properties to set
   * @returns {Sentence} Sentence instance
   * @type {{
   *   (properties: Sentence.$Shape): Sentence & Sentence.$Shape;
   *   (properties?: Sentence.$Properties): Sentence;
   * }}
   */
  Sentence.create = function (properties) {
    return new Sentence(properties)
  }

  /**
   * Encodes the specified Sentence message. Does not implicitly {@link Sentence.verify|verify} messages.
   * @function encode
   * @memberof Sentence
   * @static
   * @param {Sentence.$Properties} message Sentence message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Sentence.encode = function (message, writer, _depth) {
    if (!writer) writer = $Writer.create()
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    if (message.words != null && message.words.length)
      for (let i = 0; i < message.words.length; ++i)
        $root.Word.encode(
          message.words[i],
          writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
          _depth + 1
        ).ldelim()
    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, '$unknowns'))
      for (let i = 0; i < message.$unknowns.length; ++i) writer.raw(message.$unknowns[i])
    return writer
  }

  /**
   * Encodes the specified Sentence message, length delimited. Does not implicitly {@link Sentence.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Sentence
   * @static
   * @param {Sentence.$Properties} message Sentence message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Sentence.encodeDelimited = function (message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim()
  }

  /**
   * Decodes a Sentence message from the specified reader or buffer.
   * @function decode
   * @memberof Sentence
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Sentence & Sentence.$Shape} Sentence
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Sentence.decode = function (reader, length, _end, _depth, _target) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    if (_depth === $undefined) _depth = 0
    if (_depth > $Reader.recursionLimit) throw $Error('max depth exceeded')
    let end = length === $undefined ? reader.len : reader.pos + length,
      message = _target || new $root.Sentence()
    while (reader.pos < end) {
      let start = reader.pos
      let tag = reader.tag()
      if (tag === _end) {
        _end = $undefined
        break
      }
      let wireType = tag & 7
      switch ((tag >>>= 3)) {
        case 1: {
          if (wireType !== 2) break
          if (!(message.words && message.words.length)) message.words = []
          message.words.push($root.Word.decode(reader, reader.uint32(), $undefined, _depth + 1))
          continue
        }
      }
      reader.skipType(wireType, _depth, tag)
      if (!reader.discardUnknown) {
        $util.makeProp(message, '$unknowns', false)
        ;(message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos))
      }
    }
    if (_end !== $undefined) throw $Error('missing end group')
    return message
  }

  /**
   * Decodes a Sentence message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Sentence
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Sentence & Sentence.$Shape} Sentence
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Sentence.decodeDelimited = function (reader) {
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
  Sentence.verify = function (message, _depth) {
    if (typeof message !== 'object' || message === null) return 'object expected'
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) return 'max depth exceeded'
    if (message.words != null && $Object.hasOwnProperty.call(message, 'words')) {
      if (!$Array.isArray(message.words)) return 'words: array expected'
      for (let i = 0; i < message.words.length; ++i) {
        let error = $root.Word.verify(message.words[i], _depth + 1)
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
  Sentence.fromObject = function (object, _depth) {
    if (object instanceof $root.Sentence) return object
    if (!$util.isObject(object)) throw $TypeError('.Sentence: object expected')
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let message = new $root.Sentence()
    if (object.words) {
      if (!$Array.isArray(object.words)) throw $TypeError('.Sentence.words: array expected')
      message.words = $Array(object.words.length)
      for (let i = 0; i < object.words.length; ++i) {
        if (!$util.isObject(object.words[i])) throw $TypeError('.Sentence.words: object expected')
        message.words[i] = $root.Word.fromObject(object.words[i], _depth + 1)
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
  Sentence.toObject = function (message, options, _depth) {
    if (!options) options = {}
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let object = {}
    if (options.arrays || options.defaults) object.words = []
    if (message.words && message.words.length) {
      object.words = $Array(message.words.length)
      for (let j = 0; j < message.words.length; ++j)
        object.words[j] = $root.Word.toObject(message.words[j], options, _depth + 1)
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
  Sentence.prototype.toJSON = function () {
    return Sentence.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the type url for Sentence
   * @function getTypeUrl
   * @memberof Sentence
   * @static
   * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns {string} The type url
   */
  Sentence.getTypeUrl = function (prefix) {
    if (prefix === $undefined) prefix = 'type.googleapis.com'
    return prefix + '/Sentence'
  }

  return Sentence
})())

export const Tag = ($root.Tag = (() => {
  /**
   * Properties of a Tag.
   * @typedef {Object} Tag.$Properties
   * @property {Array.<string>|null} [values] Tag values
   * @property {boolean|null} [optional] Tag optional
   * @property {boolean|null} [repeated] Tag repeated
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */

  /**
   * Properties of a Tag.
   * @exports ITag
   * @interface ITag
   * @augments Tag.$Properties
   * @deprecated Use Tag.$Properties instead.
   */

  /**
   * Shape of a Tag.
   * @typedef {Tag.$Properties} Tag.$Shape
   */

  /**
   * Constructs a new Tag.
   * @exports Tag
   * @classdesc Represents a Tag.
   * @constructor
   * @param {Tag.$Properties=} [properties] Properties to set
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */
  const Tag = function (properties) {
    this.values = []
    if (properties)
      for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null && keys[i] !== '__proto__')
          this[keys[i]] = properties[keys[i]]
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
   * @param {Tag.$Properties=} [properties] Properties to set
   * @returns {Tag} Tag instance
   * @type {{
   *   (properties: Tag.$Shape): Tag & Tag.$Shape;
   *   (properties?: Tag.$Properties): Tag;
   * }}
   */
  Tag.create = function (properties) {
    return new Tag(properties)
  }

  /**
   * Encodes the specified Tag message. Does not implicitly {@link Tag.verify|verify} messages.
   * @function encode
   * @memberof Tag
   * @static
   * @param {Tag.$Properties} message Tag message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Tag.encode = function (message, writer, _depth) {
    if (!writer) writer = $Writer.create()
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    if (message.values != null && message.values.length)
      for (let i = 0; i < message.values.length; ++i)
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.values[i])
    if (message.optional != null && $Object.hasOwnProperty.call(message, 'optional'))
      writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.optional)
    if (message.repeated != null && $Object.hasOwnProperty.call(message, 'repeated'))
      writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.repeated)
    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, '$unknowns'))
      for (let i = 0; i < message.$unknowns.length; ++i) writer.raw(message.$unknowns[i])
    return writer
  }

  /**
   * Encodes the specified Tag message, length delimited. Does not implicitly {@link Tag.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Tag
   * @static
   * @param {Tag.$Properties} message Tag message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Tag.encodeDelimited = function (message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim()
  }

  /**
   * Decodes a Tag message from the specified reader or buffer.
   * @function decode
   * @memberof Tag
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Tag & Tag.$Shape} Tag
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Tag.decode = function (reader, length, _end, _depth, _target) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    if (_depth === $undefined) _depth = 0
    if (_depth > $Reader.recursionLimit) throw $Error('max depth exceeded')
    let end = length === $undefined ? reader.len : reader.pos + length,
      message = _target || new $root.Tag(),
      value
    while (reader.pos < end) {
      let start = reader.pos
      let tag = reader.tag()
      if (tag === _end) {
        _end = $undefined
        break
      }
      let wireType = tag & 7
      switch ((tag >>>= 3)) {
        case 1: {
          if (wireType !== 2) break
          if (!(message.values && message.values.length)) message.values = []
          message.values.push(reader.stringVerify())
          continue
        }
        case 2: {
          if (wireType !== 0) break
          if ((value = reader.bool())) message.optional = value
          else delete message.optional
          continue
        }
        case 3: {
          if (wireType !== 0) break
          if ((value = reader.bool())) message.repeated = value
          else delete message.repeated
          continue
        }
      }
      reader.skipType(wireType, _depth, tag)
      if (!reader.discardUnknown) {
        $util.makeProp(message, '$unknowns', false)
        ;(message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos))
      }
    }
    if (_end !== $undefined) throw $Error('missing end group')
    return message
  }

  /**
   * Decodes a Tag message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Tag
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Tag & Tag.$Shape} Tag
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Tag.decodeDelimited = function (reader) {
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
  Tag.verify = function (message, _depth) {
    if (typeof message !== 'object' || message === null) return 'object expected'
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) return 'max depth exceeded'
    if (message.values != null && $Object.hasOwnProperty.call(message, 'values')) {
      if (!$Array.isArray(message.values)) return 'values: array expected'
      for (let i = 0; i < message.values.length; ++i)
        if (!$util.isString(message.values[i])) return 'values: string[] expected'
    }
    if (message.optional != null && $Object.hasOwnProperty.call(message, 'optional'))
      if (typeof message.optional !== 'boolean') return 'optional: boolean expected'
    if (message.repeated != null && $Object.hasOwnProperty.call(message, 'repeated'))
      if (typeof message.repeated !== 'boolean') return 'repeated: boolean expected'
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
  Tag.fromObject = function (object, _depth) {
    if (object instanceof $root.Tag) return object
    if (!$util.isObject(object)) throw $TypeError('.Tag: object expected')
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let message = new $root.Tag()
    if (object.values) {
      if (!$Array.isArray(object.values)) throw $TypeError('.Tag.values: array expected')
      message.values = $Array(object.values.length)
      for (let i = 0; i < object.values.length; ++i) message.values[i] = $String(object.values[i])
    }
    if (object.optional != null) if (object.optional) message.optional = $Boolean(object.optional)
    if (object.repeated != null) if (object.repeated) message.repeated = $Boolean(object.repeated)
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
  Tag.toObject = function (message, options, _depth) {
    if (!options) options = {}
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let object = {}
    if (options.arrays || options.defaults) object.values = []
    if (options.defaults) {
      object.optional = false
      object.repeated = false
    }
    if (message.values && message.values.length) {
      object.values = $Array(message.values.length)
      for (let j = 0; j < message.values.length; ++j) object.values[j] = message.values[j]
    }
    if (message.optional != null && $Object.hasOwnProperty.call(message, 'optional'))
      object.optional = message.optional
    if (message.repeated != null && $Object.hasOwnProperty.call(message, 'repeated'))
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
  Tag.prototype.toJSON = function () {
    return Tag.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the type url for Tag
   * @function getTypeUrl
   * @memberof Tag
   * @static
   * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns {string} The type url
   */
  Tag.getTypeUrl = function (prefix) {
    if (prefix === $undefined) prefix = 'type.googleapis.com'
    return prefix + '/Tag'
  }

  return Tag
})())

export const Rule = ($root.Rule = (() => {
  /**
   * Properties of a Rule.
   * @typedef {Object} Rule.$Properties
   * @property {string|null} [name] Rule name
   * @property {Array.<Tag.$Properties>|null} [tags] Rule tags
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */

  /**
   * Properties of a Rule.
   * @exports IRule
   * @interface IRule
   * @augments Rule.$Properties
   * @deprecated Use Rule.$Properties instead.
   */

  /**
   * Shape of a Rule.
   * @typedef {Rule.$Properties} Rule.$Shape
   */

  /**
   * Constructs a new Rule.
   * @exports Rule
   * @classdesc Represents a Rule.
   * @constructor
   * @param {Rule.$Properties=} [properties] Properties to set
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */
  const Rule = function (properties) {
    this.tags = []
    if (properties)
      for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null && keys[i] !== '__proto__')
          this[keys[i]] = properties[keys[i]]
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
   * @member {Array.<Tag.$Properties>} tags
   * @memberof Rule
   * @instance
   */
  Rule.prototype.tags = $util.emptyArray

  /**
   * Creates a new Rule instance using the specified properties.
   * @function create
   * @memberof Rule
   * @static
   * @param {Rule.$Properties=} [properties] Properties to set
   * @returns {Rule} Rule instance
   * @type {{
   *   (properties: Rule.$Shape): Rule & Rule.$Shape;
   *   (properties?: Rule.$Properties): Rule;
   * }}
   */
  Rule.create = function (properties) {
    return new Rule(properties)
  }

  /**
   * Encodes the specified Rule message. Does not implicitly {@link Rule.verify|verify} messages.
   * @function encode
   * @memberof Rule
   * @static
   * @param {Rule.$Properties} message Rule message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Rule.encode = function (message, writer, _depth) {
    if (!writer) writer = $Writer.create()
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    if (message.name != null && $Object.hasOwnProperty.call(message, 'name'))
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name)
    if (message.tags != null && message.tags.length)
      for (let i = 0; i < message.tags.length; ++i)
        $root.Tag.encode(
          message.tags[i],
          writer.uint32(/* id 2, wireType 2 =*/ 18).fork(),
          _depth + 1
        ).ldelim()
    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, '$unknowns'))
      for (let i = 0; i < message.$unknowns.length; ++i) writer.raw(message.$unknowns[i])
    return writer
  }

  /**
   * Encodes the specified Rule message, length delimited. Does not implicitly {@link Rule.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Rule
   * @static
   * @param {Rule.$Properties} message Rule message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Rule.encodeDelimited = function (message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim()
  }

  /**
   * Decodes a Rule message from the specified reader or buffer.
   * @function decode
   * @memberof Rule
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Rule & Rule.$Shape} Rule
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Rule.decode = function (reader, length, _end, _depth, _target) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    if (_depth === $undefined) _depth = 0
    if (_depth > $Reader.recursionLimit) throw $Error('max depth exceeded')
    let end = length === $undefined ? reader.len : reader.pos + length,
      message = _target || new $root.Rule(),
      value
    while (reader.pos < end) {
      let start = reader.pos
      let tag = reader.tag()
      if (tag === _end) {
        _end = $undefined
        break
      }
      let wireType = tag & 7
      switch ((tag >>>= 3)) {
        case 1: {
          if (wireType !== 2) break
          if ((value = reader.stringVerify()).length) message.name = value
          else delete message.name
          continue
        }
        case 2: {
          if (wireType !== 2) break
          if (!(message.tags && message.tags.length)) message.tags = []
          message.tags.push($root.Tag.decode(reader, reader.uint32(), $undefined, _depth + 1))
          continue
        }
      }
      reader.skipType(wireType, _depth, tag)
      if (!reader.discardUnknown) {
        $util.makeProp(message, '$unknowns', false)
        ;(message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos))
      }
    }
    if (_end !== $undefined) throw $Error('missing end group')
    return message
  }

  /**
   * Decodes a Rule message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Rule
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Rule & Rule.$Shape} Rule
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Rule.decodeDelimited = function (reader) {
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
  Rule.verify = function (message, _depth) {
    if (typeof message !== 'object' || message === null) return 'object expected'
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) return 'max depth exceeded'
    if (message.name != null && $Object.hasOwnProperty.call(message, 'name'))
      if (!$util.isString(message.name)) return 'name: string expected'
    if (message.tags != null && $Object.hasOwnProperty.call(message, 'tags')) {
      if (!$Array.isArray(message.tags)) return 'tags: array expected'
      for (let i = 0; i < message.tags.length; ++i) {
        let error = $root.Tag.verify(message.tags[i], _depth + 1)
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
  Rule.fromObject = function (object, _depth) {
    if (object instanceof $root.Rule) return object
    if (!$util.isObject(object)) throw $TypeError('.Rule: object expected')
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let message = new $root.Rule()
    if (object.name != null)
      if (typeof object.name !== 'string' || object.name.length) message.name = $String(object.name)
    if (object.tags) {
      if (!$Array.isArray(object.tags)) throw $TypeError('.Rule.tags: array expected')
      message.tags = $Array(object.tags.length)
      for (let i = 0; i < object.tags.length; ++i) {
        if (!$util.isObject(object.tags[i])) throw $TypeError('.Rule.tags: object expected')
        message.tags[i] = $root.Tag.fromObject(object.tags[i], _depth + 1)
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
  Rule.toObject = function (message, options, _depth) {
    if (!options) options = {}
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let object = {}
    if (options.arrays || options.defaults) object.tags = []
    if (options.defaults) object.name = ''
    if (message.name != null && $Object.hasOwnProperty.call(message, 'name'))
      object.name = message.name
    if (message.tags && message.tags.length) {
      object.tags = $Array(message.tags.length)
      for (let j = 0; j < message.tags.length; ++j)
        object.tags[j] = $root.Tag.toObject(message.tags[j], options, _depth + 1)
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
  Rule.prototype.toJSON = function () {
    return Rule.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the type url for Rule
   * @function getTypeUrl
   * @memberof Rule
   * @static
   * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns {string} The type url
   */
  Rule.getTypeUrl = function (prefix) {
    if (prefix === $undefined) prefix = 'type.googleapis.com'
    return prefix + '/Rule'
  }

  return Rule
})())

export const RuleSet = ($root.RuleSet = (() => {
  /**
   * Properties of a RuleSet.
   * @typedef {Object} RuleSet.$Properties
   * @property {Array.<string>|null} [roots] RuleSet roots
   * @property {Array.<string>|null} [pos] RuleSet pos
   * @property {Array.<Rule.$Properties>|null} [rules] RuleSet rules
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */

  /**
   * Properties of a RuleSet.
   * @exports IRuleSet
   * @interface IRuleSet
   * @augments RuleSet.$Properties
   * @deprecated Use RuleSet.$Properties instead.
   */

  /**
   * Shape of a RuleSet.
   * @typedef {RuleSet.$Properties} RuleSet.$Shape
   */

  /**
   * Constructs a new RuleSet.
   * @exports RuleSet
   * @classdesc Represents a RuleSet.
   * @constructor
   * @param {RuleSet.$Properties=} [properties] Properties to set
   * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
   */
  const RuleSet = function (properties) {
    this.roots = []
    this.pos = []
    this.rules = []
    if (properties)
      for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null && keys[i] !== '__proto__')
          this[keys[i]] = properties[keys[i]]
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
   * @member {Array.<Rule.$Properties>} rules
   * @memberof RuleSet
   * @instance
   */
  RuleSet.prototype.rules = $util.emptyArray

  /**
   * Creates a new RuleSet instance using the specified properties.
   * @function create
   * @memberof RuleSet
   * @static
   * @param {RuleSet.$Properties=} [properties] Properties to set
   * @returns {RuleSet} RuleSet instance
   * @type {{
   *   (properties: RuleSet.$Shape): RuleSet & RuleSet.$Shape;
   *   (properties?: RuleSet.$Properties): RuleSet;
   * }}
   */
  RuleSet.create = function (properties) {
    return new RuleSet(properties)
  }

  /**
   * Encodes the specified RuleSet message. Does not implicitly {@link RuleSet.verify|verify} messages.
   * @function encode
   * @memberof RuleSet
   * @static
   * @param {RuleSet.$Properties} message RuleSet message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  RuleSet.encode = function (message, writer, _depth) {
    if (!writer) writer = $Writer.create()
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
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
          writer.uint32(/* id 3, wireType 2 =*/ 26).fork(),
          _depth + 1
        ).ldelim()
    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, '$unknowns'))
      for (let i = 0; i < message.$unknowns.length; ++i) writer.raw(message.$unknowns[i])
    return writer
  }

  /**
   * Encodes the specified RuleSet message, length delimited. Does not implicitly {@link RuleSet.verify|verify} messages.
   * @function encodeDelimited
   * @memberof RuleSet
   * @static
   * @param {RuleSet.$Properties} message RuleSet message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  RuleSet.encodeDelimited = function (message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim()
  }

  /**
   * Decodes a RuleSet message from the specified reader or buffer.
   * @function decode
   * @memberof RuleSet
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {RuleSet & RuleSet.$Shape} RuleSet
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  RuleSet.decode = function (reader, length, _end, _depth, _target) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    if (_depth === $undefined) _depth = 0
    if (_depth > $Reader.recursionLimit) throw $Error('max depth exceeded')
    let end = length === $undefined ? reader.len : reader.pos + length,
      message = _target || new $root.RuleSet()
    while (reader.pos < end) {
      let start = reader.pos
      let tag = reader.tag()
      if (tag === _end) {
        _end = $undefined
        break
      }
      let wireType = tag & 7
      switch ((tag >>>= 3)) {
        case 1: {
          if (wireType !== 2) break
          if (!(message.roots && message.roots.length)) message.roots = []
          message.roots.push(reader.stringVerify())
          continue
        }
        case 2: {
          if (wireType !== 2) break
          if (!(message.pos && message.pos.length)) message.pos = []
          message.pos.push(reader.stringVerify())
          continue
        }
        case 3: {
          if (wireType !== 2) break
          if (!(message.rules && message.rules.length)) message.rules = []
          message.rules.push($root.Rule.decode(reader, reader.uint32(), $undefined, _depth + 1))
          continue
        }
      }
      reader.skipType(wireType, _depth, tag)
      if (!reader.discardUnknown) {
        $util.makeProp(message, '$unknowns', false)
        ;(message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos))
      }
    }
    if (_end !== $undefined) throw $Error('missing end group')
    return message
  }

  /**
   * Decodes a RuleSet message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof RuleSet
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {RuleSet & RuleSet.$Shape} RuleSet
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  RuleSet.decodeDelimited = function (reader) {
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
  RuleSet.verify = function (message, _depth) {
    if (typeof message !== 'object' || message === null) return 'object expected'
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) return 'max depth exceeded'
    if (message.roots != null && $Object.hasOwnProperty.call(message, 'roots')) {
      if (!$Array.isArray(message.roots)) return 'roots: array expected'
      for (let i = 0; i < message.roots.length; ++i)
        if (!$util.isString(message.roots[i])) return 'roots: string[] expected'
    }
    if (message.pos != null && $Object.hasOwnProperty.call(message, 'pos')) {
      if (!$Array.isArray(message.pos)) return 'pos: array expected'
      for (let i = 0; i < message.pos.length; ++i)
        if (!$util.isString(message.pos[i])) return 'pos: string[] expected'
    }
    if (message.rules != null && $Object.hasOwnProperty.call(message, 'rules')) {
      if (!$Array.isArray(message.rules)) return 'rules: array expected'
      for (let i = 0; i < message.rules.length; ++i) {
        let error = $root.Rule.verify(message.rules[i], _depth + 1)
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
  RuleSet.fromObject = function (object, _depth) {
    if (object instanceof $root.RuleSet) return object
    if (!$util.isObject(object)) throw $TypeError('.RuleSet: object expected')
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let message = new $root.RuleSet()
    if (object.roots) {
      if (!$Array.isArray(object.roots)) throw $TypeError('.RuleSet.roots: array expected')
      message.roots = $Array(object.roots.length)
      for (let i = 0; i < object.roots.length; ++i) message.roots[i] = $String(object.roots[i])
    }
    if (object.pos) {
      if (!$Array.isArray(object.pos)) throw $TypeError('.RuleSet.pos: array expected')
      message.pos = $Array(object.pos.length)
      for (let i = 0; i < object.pos.length; ++i) message.pos[i] = $String(object.pos[i])
    }
    if (object.rules) {
      if (!$Array.isArray(object.rules)) throw $TypeError('.RuleSet.rules: array expected')
      message.rules = $Array(object.rules.length)
      for (let i = 0; i < object.rules.length; ++i) {
        if (!$util.isObject(object.rules[i])) throw $TypeError('.RuleSet.rules: object expected')
        message.rules[i] = $root.Rule.fromObject(object.rules[i], _depth + 1)
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
  RuleSet.toObject = function (message, options, _depth) {
    if (!options) options = {}
    if (_depth === $undefined) _depth = 0
    if (_depth > $util.recursionLimit) throw $Error('max depth exceeded')
    let object = {}
    if (options.arrays || options.defaults) {
      object.roots = []
      object.pos = []
      object.rules = []
    }
    if (message.roots && message.roots.length) {
      object.roots = $Array(message.roots.length)
      for (let j = 0; j < message.roots.length; ++j) object.roots[j] = message.roots[j]
    }
    if (message.pos && message.pos.length) {
      object.pos = $Array(message.pos.length)
      for (let j = 0; j < message.pos.length; ++j) object.pos[j] = message.pos[j]
    }
    if (message.rules && message.rules.length) {
      object.rules = $Array(message.rules.length)
      for (let j = 0; j < message.rules.length; ++j)
        object.rules[j] = $root.Rule.toObject(message.rules[j], options, _depth + 1)
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
  RuleSet.prototype.toJSON = function () {
    return RuleSet.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the type url for RuleSet
   * @function getTypeUrl
   * @memberof RuleSet
   * @static
   * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns {string} The type url
   */
  RuleSet.getTypeUrl = function (prefix) {
    if (prefix === $undefined) prefix = 'type.googleapis.com'
    return prefix + '/RuleSet'
  }

  return RuleSet
})())

export { $root as default }
