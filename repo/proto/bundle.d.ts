import * as $protobuf from 'protobufjs'
import Long = require('long')
/** Properties of a Word. */
export interface IWord {
  /** Word text */
  text?: string | null

  /** Word pos */
  pos?: string[] | null
}

/** Represents a Word. */
export class Word implements IWord {
  /**
   * Constructs a new Word.
   * @param [properties] Properties to set
   */
  constructor(properties?: IWord)

  /** Word text. */
  public text: string

  /** Word pos. */
  public pos: string[]

  /**
   * Creates a new Word instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Word instance
   */
  public static create(properties?: IWord): Word

  /**
   * Encodes the specified Word message. Does not implicitly {@link Word.verify|verify} messages.
   * @param message Word message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IWord,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Encodes the specified Word message, length delimited. Does not implicitly {@link Word.verify|verify} messages.
   * @param message Word message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IWord,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Decodes a Word message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Word
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): Word

  /**
   * Decodes a Word message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Word
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Word

  /**
   * Verifies a Word message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a Word message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Word
   */
  public static fromObject(object: { [k: string]: any }): Word

  /**
   * Creates a plain object from a Word message. Also converts values to other types if specified.
   * @param message Word
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Word,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any }

  /**
   * Converts this Word to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any }

  /**
   * Gets the default type url for Word
   * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns The default type url
   */
  public static getTypeUrl(typeUrlPrefix?: string): string
}

/** Properties of a Sentence. */
export interface ISentence {
  /** Sentence words */
  words?: IWord[] | null
}

/** Represents a Sentence. */
export class Sentence implements ISentence {
  /**
   * Constructs a new Sentence.
   * @param [properties] Properties to set
   */
  constructor(properties?: ISentence)

  /** Sentence words. */
  public words: IWord[]

  /**
   * Creates a new Sentence instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Sentence instance
   */
  public static create(properties?: ISentence): Sentence

  /**
   * Encodes the specified Sentence message. Does not implicitly {@link Sentence.verify|verify} messages.
   * @param message Sentence message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ISentence,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Encodes the specified Sentence message, length delimited. Does not implicitly {@link Sentence.verify|verify} messages.
   * @param message Sentence message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ISentence,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Decodes a Sentence message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Sentence
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): Sentence

  /**
   * Decodes a Sentence message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Sentence
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Sentence

  /**
   * Verifies a Sentence message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a Sentence message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Sentence
   */
  public static fromObject(object: { [k: string]: any }): Sentence

  /**
   * Creates a plain object from a Sentence message. Also converts values to other types if specified.
   * @param message Sentence
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Sentence,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any }

  /**
   * Converts this Sentence to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any }

  /**
   * Gets the default type url for Sentence
   * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns The default type url
   */
  public static getTypeUrl(typeUrlPrefix?: string): string
}

/** Properties of a Tag. */
export interface ITag {
  /** Tag values */
  values?: string[] | null

  /** Tag optional */
  optional?: boolean | null

  /** Tag repeated */
  repeated?: boolean | null
}

/** Represents a Tag. */
export class Tag implements ITag {
  /**
   * Constructs a new Tag.
   * @param [properties] Properties to set
   */
  constructor(properties?: ITag)

  /** Tag values. */
  public values: string[]

  /** Tag optional. */
  public optional: boolean

  /** Tag repeated. */
  public repeated: boolean

  /**
   * Creates a new Tag instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Tag instance
   */
  public static create(properties?: ITag): Tag

  /**
   * Encodes the specified Tag message. Does not implicitly {@link Tag.verify|verify} messages.
   * @param message Tag message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: ITag,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Encodes the specified Tag message, length delimited. Does not implicitly {@link Tag.verify|verify} messages.
   * @param message Tag message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: ITag,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Decodes a Tag message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Tag
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): Tag

  /**
   * Decodes a Tag message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Tag
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Tag

  /**
   * Verifies a Tag message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a Tag message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Tag
   */
  public static fromObject(object: { [k: string]: any }): Tag

  /**
   * Creates a plain object from a Tag message. Also converts values to other types if specified.
   * @param message Tag
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Tag,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any }

  /**
   * Converts this Tag to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any }

  /**
   * Gets the default type url for Tag
   * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns The default type url
   */
  public static getTypeUrl(typeUrlPrefix?: string): string
}

/** Properties of a Rule. */
export interface IRule {
  /** Rule name */
  name?: string | null

  /** Rule tags */
  tags?: ITag[] | null
}

/** Represents a Rule. */
export class Rule implements IRule {
  /**
   * Constructs a new Rule.
   * @param [properties] Properties to set
   */
  constructor(properties?: IRule)

  /** Rule name. */
  public name: string

  /** Rule tags. */
  public tags: ITag[]

  /**
   * Creates a new Rule instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Rule instance
   */
  public static create(properties?: IRule): Rule

  /**
   * Encodes the specified Rule message. Does not implicitly {@link Rule.verify|verify} messages.
   * @param message Rule message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IRule,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Encodes the specified Rule message, length delimited. Does not implicitly {@link Rule.verify|verify} messages.
   * @param message Rule message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IRule,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Decodes a Rule message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Rule
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): Rule

  /**
   * Decodes a Rule message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Rule
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Rule

  /**
   * Verifies a Rule message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a Rule message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Rule
   */
  public static fromObject(object: { [k: string]: any }): Rule

  /**
   * Creates a plain object from a Rule message. Also converts values to other types if specified.
   * @param message Rule
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: Rule,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any }

  /**
   * Converts this Rule to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any }

  /**
   * Gets the default type url for Rule
   * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns The default type url
   */
  public static getTypeUrl(typeUrlPrefix?: string): string
}

/** Properties of a RuleSet. */
export interface IRuleSet {
  /** RuleSet roots */
  roots?: string[] | null

  /** RuleSet pos */
  pos?: string[] | null

  /** RuleSet rules */
  rules?: IRule[] | null
}

/** Represents a RuleSet. */
export class RuleSet implements IRuleSet {
  /**
   * Constructs a new RuleSet.
   * @param [properties] Properties to set
   */
  constructor(properties?: IRuleSet)

  /** RuleSet roots. */
  public roots: string[]

  /** RuleSet pos. */
  public pos: string[]

  /** RuleSet rules. */
  public rules: IRule[]

  /**
   * Creates a new RuleSet instance using the specified properties.
   * @param [properties] Properties to set
   * @returns RuleSet instance
   */
  public static create(properties?: IRuleSet): RuleSet

  /**
   * Encodes the specified RuleSet message. Does not implicitly {@link RuleSet.verify|verify} messages.
   * @param message RuleSet message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(
    message: IRuleSet,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Encodes the specified RuleSet message, length delimited. Does not implicitly {@link RuleSet.verify|verify} messages.
   * @param message RuleSet message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encodeDelimited(
    message: IRuleSet,
    writer?: $protobuf.Writer
  ): $protobuf.Writer

  /**
   * Decodes a RuleSet message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns RuleSet
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(
    reader: $protobuf.Reader | Uint8Array,
    length?: number
  ): RuleSet

  /**
   * Decodes a RuleSet message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns RuleSet
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): RuleSet

  /**
   * Verifies a RuleSet message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  public static verify(message: { [k: string]: any }): string | null

  /**
   * Creates a RuleSet message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns RuleSet
   */
  public static fromObject(object: { [k: string]: any }): RuleSet

  /**
   * Creates a plain object from a RuleSet message. Also converts values to other types if specified.
   * @param message RuleSet
   * @param [options] Conversion options
   * @returns Plain object
   */
  public static toObject(
    message: RuleSet,
    options?: $protobuf.IConversionOptions
  ): { [k: string]: any }

  /**
   * Converts this RuleSet to JSON.
   * @returns JSON object
   */
  public toJSON(): { [k: string]: any }

  /**
   * Gets the default type url for RuleSet
   * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns The default type url
   */
  public static getTypeUrl(typeUrlPrefix?: string): string
}
