package com.main;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.main.model.News;
import com.main.repository.NewsDAO;
/** Au lancement de l'apllication le seeder ajoute quelques news */
@Component
public class DatabaseSeeder implements ApplicationListener<ApplicationReadyEvent> {
	@Autowired
	protected NewsDAO newsDao;
	public static final Long SEMAINE_MILISECONDES = 7*24*3600*1000l;

	@Override
	public void onApplicationEvent(ApplicationReadyEvent event) {
		Date now = new Date();
		
		News news1 = new News(now,"Resume 1", "Lorem ipsum dolor sit amet, "
				+ "consectetur adipiscing elit. Vivamus pretium sollicitudin ex eu sollicitudin."
				+ " In vel enim dolor. Etiam sed justo purus. Ut a dui arcu."
				+ " Maecenas nec ex sed neque efficitur venenatis. Ut non dapibus neque."
				+ " Fusce eu laoreet leo. Morbi scelerisque nisl elit, a mollis massa lacinia in."
				+ "\nNullam sed urna non mi ultricies rutrum a sit amet quam. "
				+ "Quisque mollis luctus erat nec efficitur. Nullam id nunc "
				+ "ut magna gravida hendrerit non congue lectus. Proin iaculis "
				+ "semper arcu ut commodo. Suspendisse tellus neque, dignissim "
				+ "a scelerisque quis, hendrerit lobortis metus. Pellentesque "
				+ "et urna ac dui maximus laoreet vitae a felis. Proin arcu augue, "
				+ "rutrum id iaculis at, dignissim vitae felis.");
		newsDao.save(news1);
		
		News news2 = new News(new Date(now.getTime()+SEMAINE_MILISECONDES),
				"Resume 2","News dans une semaine");
		newsDao.save(news2);
		
		News news3 = new News(new Date(now.getTime()-SEMAINE_MILISECONDES),
				"Resume 3","ANews il y a une semaine");
		newsDao.save(news3);
		
		
	}
}
