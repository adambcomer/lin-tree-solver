/*
 * Copyright 2025 Adam Bishop Comer
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

export const Head = () => {
  return (
    <>
      {import.meta.env.PROD && (
        <script
          defer
          src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon='{"token": "4a8f4dcd24dd44de90aff09a966bb224"}'
        ></script>
      )}
    </>
  )
}
