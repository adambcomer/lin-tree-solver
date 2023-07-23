/*
 * Copyright 2022 Adam Bishop Comer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Link as MuiLink, Typography, styled } from '@mui/material'
import { NavLink } from 'react-router-dom'

export const Title = styled(Typography)(() => ({}))
Title.defaultProps = { variant: 'h1', typography: 'h3' }

export const Subtitle = styled(Typography)(() => ({
  marginTop: 32
}))
Subtitle.defaultProps = { variant: 'h2', typography: 'h4' }

export const Subtitle2 = styled(Typography)(() => ({
  marginTop: 16
}))
Subtitle2.defaultProps = { variant: 'h3', typography: 'h6' }

export const Paragraph = styled(Typography)(() => ({
  marginTop: 8
}))
Paragraph.defaultProps = { variant: 'body1' }

export const Question = styled(Typography)(() => ({
  marginTop: 16
}))
Question.defaultProps = { variant: 'h3', typography: 'h6' }

export const Answer = styled(Typography)(() => ({
  marginTop: 8
}))
Answer.defaultProps = { variant: 'body1' }

export const Link = styled(NavLink)(() => ({
  color: '#1976d2',
  textDecoration: 'none'
}))

export const OutboundLink = styled(MuiLink)(() => ({
  color: '#1976d2',
  textDecoration: 'none'
}))
