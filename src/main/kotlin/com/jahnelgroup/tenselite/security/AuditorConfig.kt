package com.jahnelgroup.tenselite.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.data.domain.AuditorAware
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.jdbc.datasource.DriverManagerDataSource
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean
import org.springframework.orm.jpa.vendor.Database
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter
import javax.persistence.EntityManagerFactory
import javax.sql.DataSource

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
@EnableJpaRepositories(basePackages = ["com.jahnelgroup.tenselite.repository"])
class AuditorConfig(
    private val environment: Environment
) {
    @Bean
    fun auditorProvider(): AuditorAware<Long> {
        return AuditorAwareImpl()
    }

    @Bean
    fun dataSource(): DataSource {
        val ds = DriverManagerDataSource()
        ds.setDriverClassName(environment.getRequiredProperty("spring.datasource.driverClassName"))
        ds.url = environment.getRequiredProperty("spring.datasource.url")
        ds.username = environment.getRequiredProperty("spring.datasource.username")
        ds.password = environment.getRequiredProperty("spring.datasource.password")
        return ds
    }

    @Bean
    fun entityManagerFactory(dataSource: DataSource): EntityManagerFactory? {
        val vendorAdapter = HibernateJpaVendorAdapter()
        vendorAdapter.setDatabase(Database.MYSQL)
        val factory = LocalContainerEntityManagerFactoryBean()
        factory.jpaVendorAdapter = vendorAdapter
        factory.setPackagesToScan("com.jahnelgroup.tenselite.models")
        factory.dataSource = dataSource
        factory.afterPropertiesSet()
        return factory.`object`
    }
}
