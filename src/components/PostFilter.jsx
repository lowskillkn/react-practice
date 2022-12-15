import React from "react"
import MyInput from "./UI/input/MyInput"
import MySelect from "./UI/select/MySelect"

export default function PostFilter({ filter, setFilter }) {
  return (
    <>
      <MyInput
        value={filter.query}
        onChange={(event) =>
          setFilter((prev) => {
            return {
              ...prev,
              query: event.target.value,
            }
          })
        }
        placeholder="Поиск..."
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter((prev) => {
            return {
              ...prev,
              sort: selectedSort,
            }
          })
        }
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По названию" },
          { value: "body", name: "По значению" },
        ]}
      />
    </>
  )
}
