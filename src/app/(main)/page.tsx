import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "components/ui/card.tsx";

export default function Home() {
  return (
    <div className="h-[calc(100vh-var(--header-height))] lg:h-[calc(100vh-var(--header-height-lg))] font-sans flex justify-center items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 ">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className={"text-center"}>Справочник</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="">
            <li className="pb-4">
              <p>
                Пет проекты - это личный проект, который человек создает
                для себя в свободное время, без внешних заказчиков или
                коммерческих целей.
              </p>
            </li>
            <li className="pb-4">
              <p>Заметки - классический список заметок.</p>
            </li>
            <li>
              <p>
                Репозитории - список ссылок на интернет-ресурсы, где
                хранятся твои проекты.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
