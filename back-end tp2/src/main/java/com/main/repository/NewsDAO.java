package com.main.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.main.model.News;

public interface NewsDAO extends PagingAndSortingRepository<News, Long> {
	News findFirstByOrderByIdAsc();
	News findFirstByOrderByIdDesc();
}
