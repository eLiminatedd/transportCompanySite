import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <h2 className={styles.heading}>About Us</h2>
      <p className={styles.content}>
        Avtokran - Podem EOOD is the largest contractor of cargo-lifting and
        transport services in the territory of the Dobrich region. The company
        was founded in 1992. by Mr. Valentin Blagoev, who in just a few years,
        turned it into a regional industry leader.
      </p>
      <div className={styles.team}>
        <div className={styles.member}>
          <p>
            {' '}
            Avtokran - Podem EOOD has a wide variety of lifting and transport
            machines. Thanks to the wide range of cranes of different types,
            load capacity and height, the company is able to offer a solution
            for even the most complex construction and installation activities.
          </p>
        </div>
        <div className={styles.member}>
          <p>
            With its carts and transport machines, the company completes the set
            of services so that the customer can receive a fast, coordinated and
            organized first-hand service with just one call.
          </p>
        </div>
        {/* Add more team members as needed */}
      </div>
      <div className={styles.imageWithText}>
        <img
          src="https://besthqwallpapers.com/Uploads/1-3-2022/191393/thumb2-grove-gmk5150xl-4k-all-terrain-crane-2022-cranes-construction-machinery.jpg"
          alt="About Image"
        />
        <div className={styles.imageWithTextText}>
          <h3>
            Among the many successful projects of the company, to name a few
            that make an impression are:
          </h3>
          <p>♣ a number of hotels along the Bulgarian Black Sea coast</p>
          <p>
            ♣ loading and unloading activities in the Black Sea ports, incl. the
            port of Constanta
          </p>
          <p>♣ Launching and pulling out of the sea, of boats and yachts</p>
          <p>♣ routes of gas transmission networks</p>
          <p>♣ routes of poles of power transmission networks</p>
          <p>♣ construction of pedestals for wind turbine blades</p>
          <p>♣ installation and dismantling of metal structures</p>
          <p>♣ installation of air conditioning equipment</p>
          <p>♣ installation and dismantling of silos/grain warehouses</p>
          <p>
            ♣ construction of antennas and facilities of the Bulgarian mobile
            operators
          </p>
          <p>
            ♣ lifting activities in the construction of residential and public
            buildings.
          </p>
        </div>
      </div>
      <div className={styles.imageWithText}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtIlY4XdBiikIYFOKwZwdBcXqghkCvUTM_kA&usqp=CAU"
          alt="About Image"
        />
        <div className={styles.imageWithTextText}>
          <h3>Long-term partners of Avtokran – Podem Ltd. include:</h3>
          <p>♠♦♣ Megatron Service EAD - Sofia</p>
          <p>♠♦♣ Farmer-2000 AD – Stara Zagora</p>
          <p>♠♦♣ Venera OOD - Dobrich</p>
          <p>♠♦♣ Ustrem 92 STF - Dobrich</p>
          <p>♠♦♣ Citytrade-D EOOD – Dobrich</p>
          <p>♠♦♣ Dil Tour AD - Plovdiv</p>
          <p>♠♦♣ Rimex Engineering AD - Sofia</p>
          <p>♠♦♣ Izotech OOD - Sofia</p>
          <p>♠♦♣ Orehite OOD - Plovdiv</p>
          <p>♠♦♣ ET Ivan Ivanov-Eko – Balchik</p>
          <p>♠♦♣ SD Sudrujie Stoychevi - 5765 - Dobrich.</p>
          <p>♠♦♣ Dobrev EOOD - Dobrich</p>
          <p>♠♦♣ Monolith Ltd</p>
          <p>♠♦♣ Komplektstroy-D OOD – Dobrich</p>
          <p>♠♦♣ Metalagro AD – Dobrich</p>
          <p>♠♦♣ Vantotrade Auto AD - Sofia</p>
          <p>♠♦♣ Dobrudzha Building Ltd. – Dobrich</p>
          <p>♠♦♣ Ustrem - 92 STF - Dobrich</p>
          <p>♠♦♣ ET Nedyalko Statev - Dobrich</p>
          <p>♠♦♣ A1 EAD - Sofia</p>
          <p>♠♦♣ Vivacom EAD - Sofia</p>
        </div>
      </div>
    </div>
  );
};

export default About;
