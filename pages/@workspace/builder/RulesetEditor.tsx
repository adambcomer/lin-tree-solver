import { Chip } from "@heroui/chip"
import { tagToString } from '../../../src/helpers/ruleset'
import { Accordion, AccordionItem } from "@heroui/accordion"
import { getColor } from '../../../src/helpers/colors'
import {
  parseRuleTags,
  Ruleset,
  RulesetActions,
  RulesetActionTypes
} from '../../../api/useWorkspace'
import { Dispatch, useState } from 'react'
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"

interface PosRulesetEditorProps {
  ruleset: Ruleset
  updateRuleset: Dispatch<RulesetActions>
}

const PosRulesetEditor = ({
  ruleset,
  updateRuleset
}: PosRulesetEditorProps) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  return (
    <>
      <div className='flex flex-wrap gap-2 mb-4'>
        {[...ruleset.pos].map((p, i) => (
          <Chip
            key={p}
            onClose={() =>
              updateRuleset({ type: RulesetActionTypes.DeletePOS, pos: p })
            }
            className='text-white font-mono'
            style={{ backgroundColor: getColor(i) }}
          >
            {p}
          </Chip>
        ))}
        <Button
          startContent={
            <span className='material-symbols-rounded !text-sm'>add</span>
          }
          className='cursor-pointer h-[28px] font-mono'
          size='sm'
          radius='full'
          onPress={() => setEditing(true)}
          isDisabled={editing}
        >
          New POS
        </Button>
      </div>

      {editing && (
        <div className='flex flex-row gap-4 mb-4'>
          <Input
            className='flex-grow'
            label='New POS'
            size='sm'
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError('')
            }}
            isInvalid={!!error}
            errorMessage={error}
          />
          <Button
            onPress={() => {
              if (ruleset.pos.has(value)) {
                setError('POS already exists. Enter a new POS.')
                return
              }

              updateRuleset({ type: RulesetActionTypes.AddPOS, pos: value })
              setValue('')
              setEditing(false)
            }}
            isDisabled={!value}
            color='primary'
            className='mt-1'
          >
            Add POS
          </Button>
        </div>
      )}
    </>
  )
}

interface RootRulesetEditorProps {
  ruleset: Ruleset

  updateRuleset: Dispatch<RulesetActions>
}

const RootRulesetEditor = ({
  ruleset,
  updateRuleset
}: RootRulesetEditorProps) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  return (
    <>
      <div className='flex mb-4'>
        {[...ruleset.root].map((r) => (
          <Chip
            key={r}
            onClose={() =>
              updateRuleset({ type: RulesetActionTypes.DeleteRoot, root: r })
            }
            className='mr-2 font-mono'
          >
            {r}
          </Chip>
        ))}
        <Button
          startContent={
            <span className='material-symbols-rounded !text-sm'>add</span>
          }
          className='cursor-pointer h-[28px] font-mono'
          size='sm'
          radius='full'
          onPress={() => setEditing(true)}
          isDisabled={editing}
        >
          New Root
        </Button>
      </div>

      {editing && (
        <div className='flex flex-row gap-4 mb-4'>
          <Input
            className='flex-grow'
            label='New Root'
            size='sm'
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError('')
            }}
            isInvalid={!!error}
            errorMessage={error}
          />
          <Button
            onPress={() => {
              if (ruleset.root.has(value)) {
                setError('Root already exists. Enter a new Root.')
                return
              } else if (ruleset.rules.every((r) => value !== r.name)) {
                // TODO: Check if POS works here
                setError(
                  'Root must reference an existing Rule. Enter a new Root'
                )
                return
              }

              updateRuleset({ type: RulesetActionTypes.AddRoot, root: value })
              setValue('')
              setEditing(false)
            }}
            isDisabled={!value}
            color='primary'
            className='mt-1'
          >
            Add Root
          </Button>
        </div>
      )}
    </>
  )
}

interface RuleRulesetEditorProps {
  ruleset: Ruleset

  updateRuleset: Dispatch<RulesetActions>
}

const RuleRulesetEditor = ({
  ruleset,
  updateRuleset
}: RuleRulesetEditorProps) => {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState({ text: '', error: '' })
  const [value, setValue] = useState({ text: '', error: '' })

  const colorMap = new Map([...ruleset.pos].map((p, i) => [p, getColor(i)]))

  return (
    <>
      {ruleset.rules.map((rule, i) => (
        <div key={i} className='mb-4 flex items-center'>
          <Chip className='mr-2 font-mono'>{rule.name}</Chip>
          <div className='material-symbols-rounded !text-lg mr-2'>east</div>
          {rule.tags.map((tag, i) => (
            <Chip
              key={i}
              className='mr-2 font-mono'
              style={
                tag.values.length && ruleset.pos.has(tag.values[0])
                  ? {
                      backgroundColor: colorMap.get(tag.values[0]),
                      color: '#fff'
                    }
                  : {}
              }
            >
              {tagToString(tag).length
                ? ` ${tagToString(tag)} `
                : tagToString(tag)}
            </Chip>
          ))}
        </div>
      ))}
      <Button
        startContent={
          <span className='material-symbols-rounded !text-sm'>add</span>
        }
        className='cursor-pointer h-[28px] font-mono mb-4'
        size='sm'
        radius='full'
        onPress={() => setEditing(true)}
        isDisabled={editing}
      >
        New Rule
      </Button>

      {editing && (
        <div className='flex flex-row gap-4 mb-4'>
          <Input
            className='flex-grow'
            label='New Rule Name'
            size='sm'
            value={name.text}
            onChange={(e) => setName({ text: e.target.value, error: '' })}
            isInvalid={!!name.error}
            errorMessage={name.error}
          />
          <Input
            className='flex-grow'
            label='New Rule'
            size='sm'
            value={value.text}
            onChange={(e) => setValue({ text: e.target.value, error: '' })}
            isInvalid={!!value.error}
            errorMessage={value.error}
          />
          <Button
            onPress={() => {
              if (ruleset.pos.has(name.text)) {
                setName({
                  ...name,
                  error: 'Rule Name must not be a POS. Enter a new Rule Name'
                })
                return
              }

              const tags = parseRuleTags(value.text)
              if (
                !tags.every((t) =>
                  t.values.every(
                    (v) =>
                      ruleset.pos.has(v) ||
                      ruleset.rules.findIndex((r) => r.name === v) !== -1
                  )
                )
              ) {
                setValue({
                  ...value,
                  error:
                    'Rule is invalid because it references an non-existent tag. Enter a new Rule'
                })
                return
              }
              updateRuleset({
                type: RulesetActionTypes.AddRule,
                name: name.text,
                rule: value.text
              })
              setName({ text: '', error: '' })
              setValue({ text: '', error: '' })
              setEditing(false)
            }}
            isDisabled={!name.text || !value.text}
            color='primary'
            className='mt-1'
          >
            Add Rule
          </Button>
        </div>
      )}
    </>
  )
}

interface RulesetEditorProps {
  ruleset: Ruleset
  updateRuleset: Dispatch<RulesetActions>
}

export const RulesetEditor = ({
  ruleset,
  updateRuleset
}: RulesetEditorProps) => {
  return (
    <Accordion
      className='mt-8'
      variant='bordered'
      selectionMode='multiple'
      keepContentMounted
    >
      <AccordionItem key={1} title='Parts of Speech'>
        <PosRulesetEditor ruleset={ruleset} updateRuleset={updateRuleset} />
      </AccordionItem>

      <AccordionItem key={2} title='Root Tags'>
        <RootRulesetEditor ruleset={ruleset} updateRuleset={updateRuleset} />
      </AccordionItem>

      <AccordionItem key={3} title='Syntax Rules'>
        <RuleRulesetEditor ruleset={ruleset} updateRuleset={updateRuleset} />
      </AccordionItem>
    </Accordion>
  )
}
