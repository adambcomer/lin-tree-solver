import * as $protobuf from 'protobufjs'
import Long = require('long')

/**
 * Properties of a Word.
 * @deprecated Use Word.$Properties instead.
 */
export interface IWord extends Word.$Properties {}

/** Represents a Word. */
export class Word {
  /**
   * Constructs a new Word.
   * @param [properties] Properties to set
   */
  constructor(properties?: Word.$Properties)

  /** Unknown fields preserved while decoding when enabled */
  $unknowns?: Uint8Array[]

  /** Word text. */
  text: string

  /** Word pos. */
  pos: string[]

  /**
   * Creates a new Word instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Word instance
   */
  static create(properties: Word.$Shape): Word & Word.$Shape
  static create(properties?: Word.$Properties): Word

  /**
   * Encodes the specified Word message. Does not implicitly {@link Word.verify|verify} messages.
   * @param message Word message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encode(message: Word.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Encodes the specified Word message, length delimited. Does not implicitly {@link Word.verify|verify} messages.
   * @param message Word message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encodeDelimited(message: Word.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Decodes a Word message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns {Word & Word.$Shape} Word
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Word & Word.$Shape

  /**
   * Decodes a Word message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns {Word & Word.$Shape} Word
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Word & Word.$Shape

  /**
   * Verifies a Word message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a Word message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Word
   */
  static fromObject(object: { [k: string]: any }): Word

  /**
   * Creates a plain object from a Word message. Also converts values to other types if specified.
   * @param message Word
   * @param [options] Conversion options
   * @returns Plain object
   */
  static toObject(message: Word, options?: $protobuf.IConversionOptions): { [k: string]: any }

  /**
   * Converts this Word to JSON.
   * @returns JSON object
   */
  toJSON(): { [k: string]: any }

  /**
   * Gets the type url for Word
   * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns The type url
   */
  static getTypeUrl(prefix?: string): string
}

export namespace Word {
  /** Properties of a Word. */
  interface $Properties {
    /** Word text */
    text?: string | null

    /** Word pos */
    pos?: string[] | null

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[]
  }

  /** Shape of a Word. */
  type $Shape = Word.$Properties
}

/**
 * Properties of a Sentence.
 * @deprecated Use Sentence.$Properties instead.
 */
export interface ISentence extends Sentence.$Properties {}

/** Represents a Sentence. */
export class Sentence {
  /**
   * Constructs a new Sentence.
   * @param [properties] Properties to set
   */
  constructor(properties?: Sentence.$Properties)

  /** Unknown fields preserved while decoding when enabled */
  $unknowns?: Uint8Array[]

  /** Sentence words. */
  words: Word.$Properties[]

  /**
   * Creates a new Sentence instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Sentence instance
   */
  static create(properties: Sentence.$Shape): Sentence & Sentence.$Shape
  static create(properties?: Sentence.$Properties): Sentence

  /**
   * Encodes the specified Sentence message. Does not implicitly {@link Sentence.verify|verify} messages.
   * @param message Sentence message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encode(message: Sentence.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Encodes the specified Sentence message, length delimited. Does not implicitly {@link Sentence.verify|verify} messages.
   * @param message Sentence message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encodeDelimited(message: Sentence.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Decodes a Sentence message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns {Sentence & Sentence.$Shape} Sentence
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Sentence & Sentence.$Shape

  /**
   * Decodes a Sentence message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns {Sentence & Sentence.$Shape} Sentence
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Sentence & Sentence.$Shape

  /**
   * Verifies a Sentence message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a Sentence message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Sentence
   */
  static fromObject(object: { [k: string]: any }): Sentence

  /**
   * Creates a plain object from a Sentence message. Also converts values to other types if specified.
   * @param message Sentence
   * @param [options] Conversion options
   * @returns Plain object
   */
  static toObject(message: Sentence, options?: $protobuf.IConversionOptions): { [k: string]: any }

  /**
   * Converts this Sentence to JSON.
   * @returns JSON object
   */
  toJSON(): { [k: string]: any }

  /**
   * Gets the type url for Sentence
   * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns The type url
   */
  static getTypeUrl(prefix?: string): string
}

export namespace Sentence {
  /** Properties of a Sentence. */
  interface $Properties {
    /** Sentence words */
    words?: Word.$Properties[] | null

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[]
  }

  /** Shape of a Sentence. */
  type $Shape = Sentence.$Properties
}

/**
 * Properties of a Tag.
 * @deprecated Use Tag.$Properties instead.
 */
export interface ITag extends Tag.$Properties {}

/** Represents a Tag. */
export class Tag {
  /**
   * Constructs a new Tag.
   * @param [properties] Properties to set
   */
  constructor(properties?: Tag.$Properties)

  /** Unknown fields preserved while decoding when enabled */
  $unknowns?: Uint8Array[]

  /** Tag values. */
  values: string[]

  /** Tag optional. */
  optional: boolean

  /** Tag repeated. */
  repeated: boolean

  /**
   * Creates a new Tag instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Tag instance
   */
  static create(properties: Tag.$Shape): Tag & Tag.$Shape
  static create(properties?: Tag.$Properties): Tag

  /**
   * Encodes the specified Tag message. Does not implicitly {@link Tag.verify|verify} messages.
   * @param message Tag message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encode(message: Tag.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Encodes the specified Tag message, length delimited. Does not implicitly {@link Tag.verify|verify} messages.
   * @param message Tag message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encodeDelimited(message: Tag.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Decodes a Tag message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns {Tag & Tag.$Shape} Tag
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Tag & Tag.$Shape

  /**
   * Decodes a Tag message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns {Tag & Tag.$Shape} Tag
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Tag & Tag.$Shape

  /**
   * Verifies a Tag message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a Tag message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Tag
   */
  static fromObject(object: { [k: string]: any }): Tag

  /**
   * Creates a plain object from a Tag message. Also converts values to other types if specified.
   * @param message Tag
   * @param [options] Conversion options
   * @returns Plain object
   */
  static toObject(message: Tag, options?: $protobuf.IConversionOptions): { [k: string]: any }

  /**
   * Converts this Tag to JSON.
   * @returns JSON object
   */
  toJSON(): { [k: string]: any }

  /**
   * Gets the type url for Tag
   * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns The type url
   */
  static getTypeUrl(prefix?: string): string
}

export namespace Tag {
  /** Properties of a Tag. */
  interface $Properties {
    /** Tag values */
    values?: string[] | null

    /** Tag optional */
    optional?: boolean | null

    /** Tag repeated */
    repeated?: boolean | null

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[]
  }

  /** Shape of a Tag. */
  type $Shape = Tag.$Properties
}

/**
 * Properties of a Rule.
 * @deprecated Use Rule.$Properties instead.
 */
export interface IRule extends Rule.$Properties {}

/** Represents a Rule. */
export class Rule {
  /**
   * Constructs a new Rule.
   * @param [properties] Properties to set
   */
  constructor(properties?: Rule.$Properties)

  /** Unknown fields preserved while decoding when enabled */
  $unknowns?: Uint8Array[]

  /** Rule name. */
  name: string

  /** Rule tags. */
  tags: Tag.$Properties[]

  /**
   * Creates a new Rule instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Rule instance
   */
  static create(properties: Rule.$Shape): Rule & Rule.$Shape
  static create(properties?: Rule.$Properties): Rule

  /**
   * Encodes the specified Rule message. Does not implicitly {@link Rule.verify|verify} messages.
   * @param message Rule message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encode(message: Rule.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Encodes the specified Rule message, length delimited. Does not implicitly {@link Rule.verify|verify} messages.
   * @param message Rule message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encodeDelimited(message: Rule.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Decodes a Rule message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns {Rule & Rule.$Shape} Rule
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Rule & Rule.$Shape

  /**
   * Decodes a Rule message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns {Rule & Rule.$Shape} Rule
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Rule & Rule.$Shape

  /**
   * Verifies a Rule message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a Rule message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Rule
   */
  static fromObject(object: { [k: string]: any }): Rule

  /**
   * Creates a plain object from a Rule message. Also converts values to other types if specified.
   * @param message Rule
   * @param [options] Conversion options
   * @returns Plain object
   */
  static toObject(message: Rule, options?: $protobuf.IConversionOptions): { [k: string]: any }

  /**
   * Converts this Rule to JSON.
   * @returns JSON object
   */
  toJSON(): { [k: string]: any }

  /**
   * Gets the type url for Rule
   * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns The type url
   */
  static getTypeUrl(prefix?: string): string
}

export namespace Rule {
  /** Properties of a Rule. */
  interface $Properties {
    /** Rule name */
    name?: string | null

    /** Rule tags */
    tags?: Tag.$Properties[] | null

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[]
  }

  /** Shape of a Rule. */
  type $Shape = Rule.$Properties
}

/**
 * Properties of a RuleSet.
 * @deprecated Use RuleSet.$Properties instead.
 */
export interface IRuleSet extends RuleSet.$Properties {}

/** Represents a RuleSet. */
export class RuleSet {
  /**
   * Constructs a new RuleSet.
   * @param [properties] Properties to set
   */
  constructor(properties?: RuleSet.$Properties)

  /** Unknown fields preserved while decoding when enabled */
  $unknowns?: Uint8Array[]

  /** RuleSet roots. */
  roots: string[]

  /** RuleSet pos. */
  pos: string[]

  /** RuleSet rules. */
  rules: Rule.$Properties[]

  /**
   * Creates a new RuleSet instance using the specified properties.
   * @param [properties] Properties to set
   * @returns RuleSet instance
   */
  static create(properties: RuleSet.$Shape): RuleSet & RuleSet.$Shape
  static create(properties?: RuleSet.$Properties): RuleSet

  /**
   * Encodes the specified RuleSet message. Does not implicitly {@link RuleSet.verify|verify} messages.
   * @param message RuleSet message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encode(message: RuleSet.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Encodes the specified RuleSet message, length delimited. Does not implicitly {@link RuleSet.verify|verify} messages.
   * @param message RuleSet message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  static encodeDelimited(message: RuleSet.$Properties, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Decodes a RuleSet message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns {RuleSet & RuleSet.$Shape} RuleSet
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decode(reader: $protobuf.Reader | Uint8Array, length?: number): RuleSet & RuleSet.$Shape

  /**
   * Decodes a RuleSet message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns {RuleSet & RuleSet.$Shape} RuleSet
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  static decodeDelimited(reader: $protobuf.Reader | Uint8Array): RuleSet & RuleSet.$Shape

  /**
   * Verifies a RuleSet message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a RuleSet message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns RuleSet
   */
  static fromObject(object: { [k: string]: any }): RuleSet

  /**
   * Creates a plain object from a RuleSet message. Also converts values to other types if specified.
   * @param message RuleSet
   * @param [options] Conversion options
   * @returns Plain object
   */
  static toObject(message: RuleSet, options?: $protobuf.IConversionOptions): { [k: string]: any }

  /**
   * Converts this RuleSet to JSON.
   * @returns JSON object
   */
  toJSON(): { [k: string]: any }

  /**
   * Gets the type url for RuleSet
   * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
   * @returns The type url
   */
  static getTypeUrl(prefix?: string): string
}

export namespace RuleSet {
  /** Properties of a RuleSet. */
  interface $Properties {
    /** RuleSet roots */
    roots?: string[] | null

    /** RuleSet pos */
    pos?: string[] | null

    /** RuleSet rules */
    rules?: Rule.$Properties[] | null

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[]
  }

  /** Shape of a RuleSet. */
  type $Shape = RuleSet.$Properties
}
