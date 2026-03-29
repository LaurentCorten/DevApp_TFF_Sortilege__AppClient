import clsx from "clsx";
import style from "./Sortilege.module.css";
import { Outlet } from "react-router";


export default function SortilegePage() {





    return (
        <section className={style["playroom-container"]}>
            <section className={style["playroom-main-area"]}>
                <h2>Sortilège</h2>
                <div className={style["board-container"]}>
                    <Outlet />
                </div>
            </section>
            <aside className={clsx("big-screen-only", style["cheat-sheet-container"])}>
                <h2>Rappel des règles pour le joueur qui a un écran assez grand ^^</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas accusantium beatae fugiat perspiciatis corrupti non dolorum error temporibus ut explicabo sint necessitatibus modi placeat sunt repellendus debitis quae, aliquid impedit!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis sit vero dolorum cum ut sapiente eum in aperiam assumenda molestias, voluptates quibusdam doloribus accusantium corrupti natus iusto? Fuga, iste minus.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor corrupti, maiores quam delectus ratione nihil sint unde eius praesentium molestiae, voluptates rem fugit. Beatae voluptatibus suscipit placeat accusamus assumenda laboriosam?
                    Dolorum et fugit modi praesentium, deleniti iste debitis error? Iusto consequuntur dolorum debitis amet numquam a voluptas ullam earum aliquam. Voluptatem voluptatibus facere illo iusto ratione dolores, enim dicta error.</p>
            </aside>
        </section>
    );
}