import React from 'react';

import DatasetSelect from '../components/DatasetSelect';

function MainView(): React.ReactElement {
  return (
    <div className="w-screen flex flex-col justify-center bg-gray-100">
      <nav className="flex flex-row justify-between items-center px-8 py-1 bg-gray-600">
        <div className="flex flex-row items-center text-white">
          <a href="index" className="no-underline py-2 hover:text-gray-300"><h1 className="font-bold text-3xl">Data Jupyter</h1></a>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-4 h-screen text-center">
        <div className="pt-16">
          <h1 className="font-bold text-3xl uppercase p-4 border-b border-gray-100">Choose a dataset</h1>
          <DatasetSelect />
        </div>
        <div className="py-4">
          <h1 className="font-bold text-3xl uppercase p-4 border-b border-gray-100">Choose a dataset</h1>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur suscipit quisquam doloremque inventore porro magni obcaecati neque, ipsum possimus nemo illum, deleniti repellendus eius sed voluptatum ut cupiditate velit pariatur!
            Architecto, veritatis? Amet earum repellendus ullam quasi corrupti a quaerat, perferendis corporis modi doloremque. Voluptatem excepturi adipisci tenetur inventore ipsa eum animi, incidunt, esse non, sint sit error mollitia necessitatibus!
            Nostrum voluptates, ducimus cupiditate omnis repellat quasi officiis dolore quisquam saepe delectus? Nisi cum sequi eveniet veniam eos est dolorem. Nemo exercitationem reiciendis voluptatum quis minima autem rem labore facilis!
            Dolores illo hic cupiditate. Perspiciatis magni quis nostrum saepe, sunt incidunt corrupti ab natus nobis harum! Odit reiciendis nihil beatae autem quae repellat, non praesentium adipisci accusantium dicta nostrum laborum.
            Incidunt at eius ipsa debitis, vitae vero aspernatur modi? Amet voluptatibus esse consequatur modi, recusandae enim qui minima in praesentium delectus nobis officiis voluptates, ipsa molestias? Fugit sit voluptatum eveniet!
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur suscipit quisquam doloremque inventore porro magni obcaecati neque, ipsum possimus nemo illum, deleniti repellendus eius sed voluptatum ut cupiditate velit pariatur!
            Architecto, veritatis? Amet earum repellendus ullam quasi corrupti a quaerat, perferendis corporis modi doloremque. Voluptatem excepturi adipisci tenetur inventore ipsa eum animi, incidunt, esse non, sint sit error mollitia necessitatibus!
            Nostrum voluptates, ducimus cupiditate omnis repellat quasi officiis dolore quisquam saepe delectus? Nisi cum sequi eveniet veniam eos est dolorem. Nemo exercitationem reiciendis voluptatum quis minima autem rem labore facilis!
            Dolores illo hic cupiditate. Perspiciatis magni quis nostrum saepe, sunt incidunt corrupti ab natus nobis harum! Odit reiciendis nihil beatae autem quae repellat, non praesentium adipisci accusantium dicta nostrum laborum.
            Incidunt at eius ipsa debitis, vitae vero aspernatur modi? Amet voluptatibus esse consequatur modi, recusandae enim qui minima in praesentium delectus nobis officiis voluptates, ipsa molestias? Fugit sit voluptatum eveniet!
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainView;
