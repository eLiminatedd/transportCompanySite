import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <h2 className={styles.heading}>About Us</h2>
      <p className={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit
        bibendum ante, id dignissim lectus malesuada vel. Proin aliquet arcu ut
        mauris consectetur, vel fermentum arcu ultricies. Vestibulum ut mi et
        lacus fermentum euismod. Duis vehicula elit eu justo semper, non aliquet
        massa fermentum. Nulla facilisi.
      </p>
      <div className={styles.team}>
        <div className={styles.member}>
          <img src="team-member-1.jpg" alt="Team Member 1" />
          <h3>John Doe</h3>
          <p>Founder & CEO</p>
        </div>
        <div className={styles.member}>
          <img src="team-member-2.jpg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>Lead Developer</p>
        </div>
        {/* Add more team members as needed */}
      </div>
      <div className={styles.imageWithText}>
        <img src="about-image.jpg" alt="About Image" />
        <div className={styles.imageWithTextText}>
          <h3>Our Vision</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit corrupti numquam magni, aspernatur magnam dolorum
            sequi hic esse? Ab suscipit ut natus molestiae deserunt illum
            pariatur temporibus maiores. Laborum asperiores ipsum, recusandae
            molestiae nemo saepe id, et adipisci quam, doloremque doloribus
            veniam accusamus suscipit sunt? Repudiandae vitae in eaque, dolorum
            molestias excepturi ut minima molestiae ipsa illum, laboriosam fugit
            id ex repellat laudantium consectetur ea delectus cum error est?
            Adipisci delectus esse sapiente quibusdam ea laborum inventore
            repudiandae necessitatibus quia, quas, veritatis ipsum nostrum nemo
            dolor sint culpa fugit hic pariatur illo iure nisi quisquam
            corporis. Quod, nam aperiam aspernatur magni possimus excepturi fuga
            delectus dolorem ducimus nemo atque numquam maiores fugiat labore
            dolorum ratione beatae et voluptates nulla quo quasi. Cupiditate
            nemo magnam, maxime dolorum fugit eius saepe quod nihil neque vero
            hic et necessitatibus rerum magni a minus incidunt suscipit officia
            laboriosam ad reiciendis atque doloribus aperiam dicta! Tenetur, quo
            repudiandae? Excepturi neque necessitatibus ut minima ipsa dicta
            nemo molestiae deserunt, blanditiis ab minus expedita aperiam
            laboriosam velit! Vitae quos, adipisci dolorum libero porro sit amet
            at, neque laborum cumque, consequuntur corporis voluptas quam!
            Ducimus provident esse temporibus dignissimos? Nemo ipsam alias
            aperiam consectetur voluptate voluptas et illo animi, officia
            laboriosam dolor repudiandae ipsa, dicta eum molestias? Tempora
            accusantium, dolorum reiciendis tempore impedit harum asperiores,
            deleniti ducimus fuga laborum magnam maxime, ab dolor esse nam fugit
            cum earum ipsam labore! Veniam distinctio dolorem, quod nihil
            quibusdam quia, quisquam eum, consequatur rerum maiores voluptatibus
            reiciendis. Ea libero aliquid ab commodi quasi, eos, vitae itaque
            possimus quis, dolorem vel praesentium. Itaque libero quas
            consequuntur repellat voluptates molestias doloremque quam? Debitis
            at molestias dolorem, veritatis quas assumenda, culpa quod, quia
            aperiam esse distinctio veniam eaque facilis? Totam officiis error
            sunt ipsa veniam magni nesciunt vitae odit, laboriosam impedit
            perspiciatis odio est!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
